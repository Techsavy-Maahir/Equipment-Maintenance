
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import app from "../src/app.js";

const equipmentService = vi.hoisted(() => ({
  listEquipment: vi.fn(),
  getEquipment: vi.fn(),
  createEquipment: vi.fn(),
  updateEquipment: vi.fn(),
  deactivateEquipment: vi.fn(),
}));

const authMocks = vi.hoisted(() => ({
  verifyToken: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("../src/services/equipment.service.js", () => equipmentService);

vi.mock("../src/services/auth.service.js", () => ({
  authService: {
    verifyToken: authMocks.verifyToken,
  },
}));

vi.mock("../src/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: authMocks.findUnique,
    },
  },
}));

const authCookie = "token=test-token";

const validEquipmentInput = {
  code: "PUMP-001",
  name: "Pump",
  criticality: "HIGH",
  departmentId: 1,
  locationId: 2,
  categoryId: 3,
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

  authMocks.verifyToken.mockReturnValue({ userId: 1 });

  authMocks.findUnique.mockResolvedValue({
    id: 1,
    email: "admin@example.com",
    name: "Test Admin",
    role: "ADMIN",
    isActive: true,
  });
});

describe("equipment API", () => {
  it("supports listing, creating, getting, updating, and deactivating equipment", async () => {
    const equipment = { id: 1, ...validEquipmentInput, isDeactivated: false };

    equipmentService.listEquipment.mockResolvedValue({
      items: [equipment],
      total: 1,
      page: 1,
      pageSize: 8,
      locations: [],
      categories: [],
    });

    equipmentService.createEquipment.mockResolvedValue(equipment);
    equipmentService.getEquipment.mockResolvedValue(equipment);
    equipmentService.updateEquipment.mockResolvedValue(equipment);
    equipmentService.deactivateEquipment.mockResolvedValue({
      ...equipment,
      isDeactivated: true,
    });

    const listResponse = await fetch(`${baseUrl}/api/equipment`, {
      headers: { Cookie: authCookie },
    });

    expect(listResponse.status).toBe(200);
    expect(await listResponse.json()).toEqual({
      items: [equipment],
      total: 1,
      page: 1,
      pageSize: 8,
      locations: [],
      categories: [],
    });

    expect(equipmentService.listEquipment).toHaveBeenCalledWith({
      search: "",
      page: 1,
      pageSize: 8,
    });

    const createResponse = await fetch(`${baseUrl}/api/equipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: authCookie },
      body: JSON.stringify(validEquipmentInput),
    });

    expect(createResponse.status).toBe(201);
    expect(await createResponse.json()).toEqual(equipment);
    expect(equipmentService.createEquipment).toHaveBeenCalledWith(
      validEquipmentInput,
    );

    const getResponse = await fetch(`${baseUrl}/api/equipment/1`, {
      headers: { Cookie: authCookie },
    });

    expect(getResponse.status).toBe(200);
    expect(await getResponse.json()).toEqual(equipment);
    expect(equipmentService.getEquipment).toHaveBeenCalledWith(1);

    const updateResponse = await fetch(`${baseUrl}/api/equipment/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: authCookie },
      body: JSON.stringify({ name: "Updated pump" }),
    });

    expect(updateResponse.status).toBe(200);
    expect(equipmentService.updateEquipment).toHaveBeenCalledWith(1, {
      name: "Updated pump",
    });

    const deactivateResponse = await fetch(`${baseUrl}/api/equipment/1`, {
      method: "DELETE",
      headers: { Cookie: authCookie },
    });

    expect(deactivateResponse.status).toBe(200);
    expect(equipmentService.deactivateEquipment).toHaveBeenCalledWith(1);
  });

  it("parses list filters and caps page size at 100", async () => {
    equipmentService.listEquipment.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 100,
      locations: [],
      categories: [],
    });

    const response = await fetch(
      `${baseUrl}/api/equipment?search=CNC&status=ACTIVE&location=2&category=3&page=2&pageSize=500`,
      {
        headers: { Cookie: authCookie },
      },
    );

    expect(response.status).toBe(200);
    expect(equipmentService.listEquipment).toHaveBeenCalledWith({
      search: "CNC",
      status: "ACTIVE",
      location: 2,
      category: 3,
      page: 2,
      pageSize: 100,
    });
  });

  it("rejects malformed list query parameters", async () => {
    const response = await fetch(
      `${baseUrl}/api/equipment?status=UNKNOWN&page=0&unexpected=true`,
      {
        headers: { Cookie: authCookie },
      },
    );

    expect(response.status).toBe(400);
    expect(equipmentService.listEquipment).not.toHaveBeenCalled();
  });

  it("returns 409 when an asset code conflicts", async () => {
    equipmentService.createEquipment.mockRejectedValue(
      new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "test",
        meta: { target: ["code"] },
      }),
    );

    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await fetch(`${baseUrl}/api/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify(validEquipmentInput),
    });

    expect(response.status).toBe(409);
    expect((await response.json()).error).toBe("Conflict");

    consoleError.mockRestore();
  });

  it("rejects unexpected fields and invalid equipment IDs", async () => {
    const invalidBodyResponse = await fetch(`${baseUrl}/api/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({ ...validEquipmentInput, unexpected: true }),
    });

    expect(invalidBodyResponse.status).toBe(400);
    expect(equipmentService.createEquipment).not.toHaveBeenCalled();

    const invalidIdResponse = await fetch(
      `${baseUrl}/api/equipment/not-an-id`,
      {
        headers: { Cookie: authCookie },
      },
    );

    expect(invalidIdResponse.status).toBe(400);
    expect(equipmentService.getEquipment).not.toHaveBeenCalled();
  });

    it("enforces authentication and equipment role permissions", async () => {
    // Unauthenticated users must receive 401
    const unauthenticatedResponse = await fetch(
      `${baseUrl}/api/equipment`,
    );
    expect(unauthenticatedResponse.status).toBe(401);

    // TECHNICIAN cannot create equipment
    authMocks.findUnique.mockResolvedValue({
      id: 2,
      email: "tech@example.com",
      name: "Test Technician",
      role: "TECHNICIAN",
      isActive: true,
    });

    const technicianResponse = await fetch(
      `${baseUrl}/api/equipment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify(validEquipmentInput),
      },
    );

    expect(technicianResponse.status).toBe(403);

    // VIEWER cannot update equipment
    authMocks.findUnique.mockResolvedValue({
      id: 3,
      email: "viewer@example.com",
      name: "Test Viewer",
      role: "VIEWER",
      isActive: true,
    });

    const viewerResponse = await fetch(
      `${baseUrl}/api/equipment/1`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ name: "Updated pump" }),
      },
    );

    expect(viewerResponse.status).toBe(403);

    // MANAGER can create equipment
    authMocks.findUnique.mockResolvedValue({
      id: 4,
      email: "manager@example.com",
      name: "Test Manager",
      role: "MANAGER",
      isActive: true,
    });

    equipmentService.createEquipment.mockResolvedValue({
      id: 2,
      ...validEquipmentInput,
    });

    const managerResponse = await fetch(
      `${baseUrl}/api/equipment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify(validEquipmentInput),
      },
    );

    expect(managerResponse.status).toBe(201);

    // ADMIN can create equipment
    authMocks.findUnique.mockResolvedValue({
      id: 1,
      email: "admin@example.com",
      name: "Test Admin",
      role: "ADMIN",
      isActive: true,
    });

    const adminResponse = await fetch(
      `${baseUrl}/api/equipment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify(validEquipmentInput),
      },
    );

    expect(adminResponse.status).toBe(201);
  });
});
