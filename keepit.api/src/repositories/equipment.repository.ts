import prisma from "../config/prisma.js";
import { Equipment, Prisma } from "../generated/prisma/client.js";

export class EquipmentRepository {
  async getAll(): Promise<Equipment[]> {
    return prisma.equipment.findMany();
  }

  async getById(id: string): Promise<Equipment | null> {
    return prisma.equipment.findUnique({
      where: { id },
    });
  }

  async save(data: Prisma.EquipmentCreateInput): Promise<Equipment> {
    return prisma.equipment.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.EquipmentUpdateInput,
  ): Promise<Equipment | null> {
    return prisma.equipment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Equipment> {
    return prisma.equipment.delete({
      where: { id },
    });
  }
}
