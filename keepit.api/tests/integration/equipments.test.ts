import supertest, { Response } from "supertest";
import { v4 } from "uuid";
import app from "../../src/app";
import { createAndAuthenticateUser } from "../utils/test.helper";
import { generateEquipment } from "../utils/equipment.template";

const route = "/equipments";

let user: any;

beforeAll(async () => {
  user = await createAndAuthenticateUser();
});

describe("Equipment Integration Tests", () => {
  test("Should return all equipments", async () => {
    const res: Response = await supertest(app)
      .get(route)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Should create and then return an equipment by ID", async () => {
    const equipmentData = generateEquipment();

    const createRes: Response = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(equipmentData);

    expect(createRes.status).toBe(201);
    const createdId = createRes.body.id;

    const res: Response = await supertest(app)
      .get(`${route}/${createdId}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(equipmentData.name);
  });

  test("Should return 404 when equipment does not exist", async () => {
    const res: Response = await supertest(app)
      .get(`${route}/${v4()}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Equipment not found.");
  });

  test("Should create a new equipment successfully", async () => {
    const newEquipment = generateEquipment();

    const res: Response = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(newEquipment);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Equipment created successfully.");
    expect(res.body).toHaveProperty("id");
  });

  test("Should assign an equipment to a user", async () => {
    const equipment = generateEquipment();
    const createRes = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(equipment);

    const equipmentId = createRes.body.id;

    const res: Response = await supertest(app)
      .patch(`${route}/${equipmentId}/assign`)
      .set("Authorization", `Bearer ${user.token}`)
      .send({
        targetUserId: user.id,
        adminId: user.id,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Equipment assigned successfully.");
    expect(res.body.data.status).toBe("ASSIGNED");
  });

  test("Should update an equipment successfully", async () => {
    const equipment = generateEquipment();
    const createRes = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(equipment);

    const equipmentId = createRes.body.id;
    const updateData = { name: "Updated Name" };

    const res: Response = await supertest(app)
      .put(`${route}/${equipmentId}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Equipment updated successfully.");
  });

  test("Should delete an equipment by ID", async () => {
    const equipment = generateEquipment();
    const createRes = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(equipment);

    const res: Response = await supertest(app)
      .delete(`${route}/${createRes.body.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(204);
  });

  const testValidationError = async (data: any, expectedMessage: string) => {
    const baseData = generateEquipment();

    const payload = { ...baseData, ...data };

    const res: Response = await supertest(app)
      .post(route)
      .set("Authorization", `Bearer ${user.token}`)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(expectedMessage);
  };

  test("Should fail if name is missing", () =>
    testValidationError(
      generateEquipment({ name: null as any }),
      "Name is required.",
    ));

  test("Should fail if serialNumber is missing", () =>
    testValidationError(
      generateEquipment({ serialNumber: null as any }),
      "Serial Number is required.",
    ));

  test("Should fail if category is missing", () =>
    testValidationError(
      generateEquipment({ category: null as any }),
      "Category is required.",
    ));
});
