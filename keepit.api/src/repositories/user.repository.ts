import prisma from "../config/prisma.js";
import { Prisma, User } from "../generated/prisma/client.js";

export class UserRepository {
  async getAll(): Promise<User[]> {
    return prisma.user.findMany({
      include: { equipments: true },
    });
  }

  async getById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { equipments: true, assignedLogs: true },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
