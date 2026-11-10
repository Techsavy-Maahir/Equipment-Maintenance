import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import app from "../src/app.js";
import { AppError } from "../src/errors.js";

const requestService = vi.hoisted(() => ({
  createMaintenanceRequest: vi.fn(),
  getMaintenanceRequest: vi.fn(),
  listMaintenanceRequests: vi.fn(),
  transitionMaintenanceRequest: vi.fn(),
}));

const authMocks = vi.hoisted(() => ({
  verifyToken: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("../src/services/request.service.js", () => requestService);
vi.mock("../src/services/auth.service.js", () => ({
  authService: { verifyToken: authMocks.verifyToken },
}));
vi.mock("../src/prisma.js", () => ({
  prisma: { user: { findUnique: authMocks.findUnique } },
}));

const authCookie = "token=test-token";
const validRequestInput = {
  requestType: "BREAKDOWN",
  equipmentId: 7,
  description: "Pump is vibrating",
  criticality: "HIGH",
  problem: "Excessive vibration",
};

let server: ReturnType<typeof app.listen>;
let baseUrl: string;

beforeAll(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine the test server address");
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

beforeEach(() => {
  vi.clearAllMocks();
  authMocks.verifyToken.mockReturnValue({ userId: 2 });
  authMocks.findUnique.mockResolvedValue({
    id: 2,
    email: "requester@example.com",
    name: "Requester",
    role: "VIEWER",
    isActive: true,
  });
});

describe("maintenance request API", () => {
  it("requires authentication for request endpoints", async () => {
    const response = await fetch(`${baseUrl}/api/requests`);

    expect(response.status).toBe(401);
    expect(requestService.listMaintenanceRequests).not.toHaveBeenCalled();
  });

  it("creates requests for the authenticated requester", async () => {
    const createdRequest = {
      id: 44,
      ...validRequestInput,
      requesterId: 2,
      status: "SUBMITTED",
    };
    requestService.createMaintenanceRequest.mockResolvedValue(createdRequest);

    const response = await fetch(`${baseUrl}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify(validRequestInput),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual(createdRequest);
    expect(requestService.createMaintenanceRequest).toHaveBeenCalledWith(
      validRequestInput,
      expect.objectContaining({ id: 2, role: "VIEWER" }),
    );
  });

  it("rejects client-supplied requester IDs and invalid request bodies", async () => {
    const response = await fetch(`${baseUrl}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({ ...validRequestInput, requesterId: 99 }),
    });

    expect(response.status).toBe(400);
    expect(requestService.createMaintenanceRequest).not.toHaveBeenCalled();
  });

  it("parses request list filters and passes the authenticated actor", async () => {
    const result = { items: [], total: 0, page: 1, pageSize: 10 };
    requestService.listMaintenanceRequests.mockResolvedValue(result);

    const response = await fetch(
      `${baseUrl}/api/requests?status=SUBMITTED&requestType=BREAKDOWN&equipmentId=7&pageSize=500`,
      { headers: { Cookie: authCookie } },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(result);
    expect(requestService.listMaintenanceRequests).toHaveBeenCalledWith(
      {
        status: "SUBMITTED",
        requestType: "BREAKDOWN",
        equipmentId: 7,
        page: 1,
        pageSize: 100,
      },
      expect.objectContaining({ id: 2 }),
    );
  });

  it("rejects malformed request IDs using the standard validation response", async () => {
    const response = await fetch(`${baseUrl}/api/requests/not-an-id`, {
      headers: { Cookie: authCookie },
    });

    expect(response.status).toBe(400);
    expect(requestService.getMaintenanceRequest).not.toHaveBeenCalled();
  });

  it("passes validated transitions and actor identity to the service", async () => {
    const updatedRequest = { id: 44, status: "CANCELLED" };
    requestService.transitionMaintenanceRequest.mockResolvedValue(updatedRequest);

    const response = await fetch(`${baseUrl}/api/requests/44/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        status: "CANCELLED",
        comment: "No longer needed",
      }),
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(updatedRequest);
    expect(requestService.transitionMaintenanceRequest).toHaveBeenCalledWith(
      44,
      expect.objectContaining({ id: 2, role: "VIEWER" }),
      { status: "CANCELLED", comment: "No longer needed" },
    );
  });

  it("returns existing 403 authorization errors from the request service", async () => {
    requestService.transitionMaintenanceRequest.mockRejectedValue(
      new AppError(403, "Forbidden: You cannot perform this request transition"),
    );
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await fetch(`${baseUrl}/api/requests/44/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({ status: "APPROVED" }),
    });

    expect(response.status).toBe(403);
    expect((await response.json()).message).toContain("Forbidden");
    consoleError.mockRestore();
  });
});
