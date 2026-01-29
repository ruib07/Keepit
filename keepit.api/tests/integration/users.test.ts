import supertest, { Response } from "supertest";
import { v4 } from "uuid";
import app from "../../src/app";
import { createAndAuthenticateUser } from "../utils/test.helper";
import { generateUser } from "../utils/user.template";

const signupRoute = "/auth/signup";
const route = "/users";

let user: any;

beforeAll(async () => {
  user = await createAndAuthenticateUser();
});

describe("User Integration Tests", () => {
  test("Should return all users", async () => {
    const res: Response = await supertest(app)
      .get(route)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Should return a user by his ID", async () => {
    const res: Response = await supertest(app)
      .get(`${route}/${user.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
  });

  test("Should return not found message when user does not exist", async () => {
    const res: Response = await supertest(app)
      .get(`${route}/${v4()}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found.");
  });

  test("Should update an user successfully", async () => {
    const userReq = generateUser();
    const createRes = await supertest(app).post(signupRoute).send(userReq);

    const userId = createRes.body.id;
    const updateData = { name: "Updated Name" };

    const res: Response = await supertest(app)
      .put(`${route}/${userId}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully.");
  });

  test("Should delete an user by ID", async () => {
    const userReq = generateUser();
    const createRes = await supertest(app).post(signupRoute).send(userReq);

    const res: Response = await supertest(app)
      .delete(`${route}/${createRes.body.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(204);
  });
});
