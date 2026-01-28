import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Equipment, Prisma } from "../generated/prisma/client.js";
import { EquipmentRepository } from "../repositories/equipment.repository.js";

export class EquipmentService {
  private equipmentRepository = new EquipmentRepository();

  async getAll(): Promise<Equipment[]> {
    return this.equipmentRepository.getAll();
  }

  async getById(id: string): Promise<Equipment> {
    const equipment = await this.equipmentRepository.getById(id);

    if (!equipment) throw new NotFoundError("Equipment not found.");

    return equipment;
  }

  async save(equipment: Prisma.EquipmentCreateInput): Promise<Equipment> {
    if (!equipment.name) throw new ValidationError("Name is required.");
    if (!equipment.category) throw new ValidationError("Category is required.");
    if (!equipment.serialNumber)
      throw new ValidationError("Serial Number is required.");
    if (!equipment.status) throw new ValidationError("Status is required.");
    if (!equipment.purchaseDate)
      throw new ValidationError("Purchase Date is required.");
    if (!equipment.price) throw new ValidationError("Price is required.");

    return await this.equipmentRepository.save(equipment);
  }

  async assignToUser(
    equipmentId: string,
    targetUserId: string,
    adminId: string,
  ) {
    return await this.equipmentRepository.update(equipmentId, {
      user: { connect: { id: targetUserId } },
      assignedBy: { connect: { id: adminId } },
      status: "ASSIGNED",
    });
  }

  async update(
    id: string,
    updates: Partial<Prisma.EquipmentUpdateInput>,
  ): Promise<Equipment | null> {
    const equipment = await this.equipmentRepository.getById(id);

    if (!equipment) throw new NotFoundError("Equipment not found.");

    return this.equipmentRepository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const equipment = await this.equipmentRepository.getById(id);

    if (!equipment) throw new NotFoundError("Equipment not found.");

    await this.equipmentRepository.delete(id);
  }
}
