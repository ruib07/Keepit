import supertest, { Response } from "supertest";
import { generateUser } from "../utils/user.template";
import app from "../../src/app";

const signinRoute = "/auth/signin";
const signupRoute = "/auth/signup";

describe("Authentication Integration Tests", () => {
  test("Should create a new user successfully", async () => {
    const newUser = generateUser();

    const res: Response = await supertest(app).post(signupRoute).send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("Should return a token when the user authenticates successfully", async () => {
    const user = generateUser();

    const signupRes: Response = await supertest(app)
      .post(signupRoute)
      .send(user);

    expect(signupRes.status).toBe(201);

    const signinRes: Response = await supertest(app).post(signinRoute).send({
      email: user.email,
      password: user.password,
    });

    expect(signinRes.status).toBe(200);
    expect(signinRes.body).toHaveProperty("token");
    expect(signinRes.body).toHaveProperty("user");
  });

  test("Should fail authentication when the user puts invalid credentials", async () => {
    const user = generateUser();

    const signupRes: Response = await supertest(app)
      .post(signupRoute)
      .send(user);

    expect(signupRes.status).toBe(201);

    const signinRes: Response = await supertest(app).post(signinRoute).send({
      email: user.email,
      password: "Invalid@Password-123",
    });

    expect(signinRes.status).toBe(400);
    expect(signinRes.body.message).toBe("Invalid authentication.");
  });

  const testValidationError = async (data: any, expectedMessage: string) => {
    const baseData = generateUser();

    const payload = { ...baseData, ...data };

    const res: Response = await supertest(app).post(signupRoute).send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(expectedMessage);
  };

  test("Should fail if name is missing", () =>
    testValidationError(
      generateUser({ name: null as any }),
      "Name is required.",
    ));

  test("Should fail if email is missing", () =>
    testValidationError(
      generateUser({ email: null as any }),
      "Email is required.",
    ));

  test("Should fail if password is missing", () =>
    testValidationError(
      generateUser({ password: null as any }),
      "Password is required.",
    ));

  test("Should fail if department is missing", () =>
    testValidationError(
      generateUser({ department: null as any }),
      "Department is required.",
    ));
});
