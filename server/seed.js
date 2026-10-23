import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.ts";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (idempotent: safe to run multiple times)
  await prisma.equipment.deleteMany({});
  await prisma.equipmentCategory.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing data.");

  // Seed Users (1 per role)
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: "manager@example.com",
      name: "Manager User",
      role: "MANAGER",
    },
  });

  const technician = await prisma.user.create({
    data: {
      email: "technician@example.com",
      name: "Technician User",
      role: "TECHNICIAN",
    },
  });

  const viewer = await prisma.user.create({
    data: {
      email: "viewer@example.com",
      name: "Viewer User",
      role: "VIEWER",
    },
  });

  console.log("Created 4 users (1 per role).");

  // Seed Departments (2)
  const maintenance = await prisma.department.create({
    data: { name: "Maintenance" },
  });

  const production = await prisma.department.create({
    data: { name: "Production" },
  });

  console.log("Created 2 departments.");

  // Seed Locations (3)
  const workshop = await prisma.location.create({
    data: { name: "Workshop" },
  });

  const factoryFloor = await prisma.location.create({
    data: { name: "Factory Floor" },
  });

  const warehouse = await prisma.location.create({
    data: { name: "Warehouse" },
  });

  console.log("Created 3 locations.");

  // Seed Equipment Categories (2)
  const electrical = await prisma.equipmentCategory.create({
    data: { name: "Electrical" },
  });

  const mechanical = await prisma.equipmentCategory.create({
    data: { name: "Mechanical" },
  });

  console.log("Created 2 equipment categories.");

  // Seed Equipment (10)
  const equipment = await prisma.equipment.createMany({
    data: [
      {
        code: "EQ-001",
        name: "Air Compressor",
        description: "Industrial air compressor for pneumatic tools",
        status: "ACTIVE",
        criticality: "HIGH",
        departmentId: maintenance.id,
        locationId: workshop.id,
        categoryId: mechanical.id,
      },
      {
        code: "EQ-002",
        name: "Control Panel",
        description: "Main electrical control panel",
        status: "ACTIVE",
        criticality: "HIGH",
        departmentId: production.id,
        locationId: factoryFloor.id,
        categoryId: electrical.id,
      },
      {
        code: "EQ-003",
        name: "Hydraulic Press",
        description: "Heavy-duty hydraulic press",
        status: "ACTIVE",
        criticality: "HIGH",
        departmentId: production.id,
        locationId: factoryFloor.id,
        categoryId: mechanical.id,
      },
      {
        code: "EQ-004",
        name: "Welding Machine",
        description: "MIG welding equipment",
        status: "ACTIVE",
        criticality: "MEDIUM",
        departmentId: maintenance.id,
        locationId: workshop.id,
        categoryId: electrical.id,
      },
      {
        code: "EQ-005",
        name: "Conveyor Belt",
        description: "Automated conveyor system",
        status: "UNDER_MAINTENANCE",
        criticality: "HIGH",
        departmentId: production.id,
        locationId: factoryFloor.id,
        categoryId: mechanical.id,
      },
      {
        code: "EQ-006",
        name: "Drill Press",
        description: "Precision drill press machine",
        status: "ACTIVE",
        criticality: "MEDIUM",
        departmentId: maintenance.id,
        locationId: workshop.id,
        categoryId: mechanical.id,
      },
      {
        code: "EQ-007",
        name: "Temperature Sensor",
        description: "Digital temperature monitoring sensor",
        status: "ACTIVE",
        criticality: "LOW",
        departmentId: production.id,
        locationId: factoryFloor.id,
        categoryId: electrical.id,
      },
      {
        code: "EQ-008",
        name: "Tool Cabinet",
        description: "Storage cabinet for maintenance tools",
        status: "INACTIVE",
        criticality: "LOW",
        departmentId: maintenance.id,
        locationId: warehouse.id,
        categoryId: mechanical.id,
      },
      {
        code: "EQ-009",
        name: "Generator",
        description: "Backup electrical generator",
        status: "ACTIVE",
        criticality: "HIGH",
        departmentId: production.id,
        locationId: warehouse.id,
        categoryId: electrical.id,
      },
      {
        code: "EQ-010",
        name: "Lathe Machine",
        description: "CNC lathe for precision machining",
        status: "ACTIVE",
        criticality: "MEDIUM",
        departmentId: maintenance.id,
        locationId: workshop.id,
        categoryId: mechanical.id,
      },
    ],
  });

  console.log("Created 10 equipment records.");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });