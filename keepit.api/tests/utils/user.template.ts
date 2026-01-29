import { v4 } from "uuid";
import { User } from "../../src/generated/prisma/client.js";

export type UserCreateInput = Partial<User>;

export const generateUser = (overrides: UserCreateInput = {}): User => {
  const base = {
    id: v4(),
    name: `User ${v4().slice(0, 8)}`,
    email: `${v4()}@email.com`,
    password: "User@Test-123",
    department: "IT",
    createdAt: new Date(),
  };

  return { ...base, ...overrides };
};
