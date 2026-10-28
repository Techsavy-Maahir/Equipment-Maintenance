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

vi.mock("../src/services/equipment.service.js", () => equipmentService);

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
});

describe("equipment API", () => {
  it("supports listing, creating, getting, updating, and deactivating equipment", async () => {
    const equipment = { id: 1, ...validEquipmentInput, isDeactivated: false };
    equipmentService.listEquipment.mockResolvedValue([equipment]);
    equipmentService.createEquipment.mockResolvedValue(equipment);
    equipmentService.getEquipment.mockResolvedValue(equipment);
    equipmentService.updateEquipment.mockResolvedValue(equipment);
    equipmentService.deactivateEquipment.mockResolvedValue({
      ...equipment,
      isDeactivated: true,
    });

    const listResponse = await fetch(`${baseUrl}/api/equipment`);
    expect(listResponse.status).toBe(200);
    expect(await listResponse.json()).toEqual([equipment]);

    const createResponse = await fetch(`${baseUrl}/api/equipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validEquipmentInput),
    });
    expect(createResponse.status).toBe(201);
    expect(await createResponse.json()).toEqual(equipment);
    expect(equipmentService.createEquipment).toHaveBeenCalledWith(
      validEquipmentInput,
    );

    const getResponse = await fetch(`${baseUrl}/api/equipment/1`);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.json()).toEqual(equipment);
    expect(equipmentService.getEquipment).toHaveBeenCalledWith(1);

    const updateResponse = await fetch(`${baseUrl}/api/equipment/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated pump" }),
    });
    expect(updateResponse.status).toBe(200);
    expect(equipmentService.updateEquipment).toHaveBeenCalledWith(1, {
      name: "Updated pump",
    });

    const deactivateResponse = await fetch(`${baseUrl}/api/equipment/1`, {
      method: "DELETE",
    });
    expect(deactivateResponse.status).toBe(200);
    expect(equipmentService.deactivateEquipment).toHaveBeenCalledWith(1);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validEquipmentInput),
    });

    expect(response.status).toBe(409);
    expect((await response.json()).error).toBe("Conflict");
    consoleError.mockRestore();
  });

  it("rejects unexpected fields and invalid equipment IDs", async () => {
    const invalidBodyResponse = await fetch(`${baseUrl}/api/equipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validEquipmentInput, unexpected: true }),
    });
    expect(invalidBodyResponse.status).toBe(400);
    expect(equipmentService.createEquipment).not.toHaveBeenCalled();

    const invalidIdResponse = await fetch(`${baseUrl}/api/equipment/not-an-id`);
    expect(invalidIdResponse.status).toBe(400);
    expect(equipmentService.getEquipment).not.toHaveBeenCalled();
  });
});
