import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { EquipmentService } from "../services/equipment.service.js";

export class EquipmentsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new EquipmentService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const equipmentId = req.params.id as string;

    res.send(await new EquipmentService().getById(equipmentId));
  }

  static async create(req: Request, res: Response) {
    const equipment = req.body as Prisma.EquipmentCreateInput;

    const createdCategory = await new EquipmentService().save(equipment);

    res.status(201).send({
      message: "Equipment created successfully.",
      id: createdCategory.id,
    });
  }

  static async update(req: Request, res: Response) {
    const equipmentId = req.params.id as string;
    const equipment = req.body as Prisma.EquipmentUpdateInput;

    await new EquipmentService().update(equipmentId, equipment);

    res.send({
      message: "Equipment updated successfully.",
    });
  }

  static async delete(req: Request, res: Response) {
    const equipmentId = req.params.id as string;

    await new EquipmentService().delete(equipmentId);
    res.status(204).end();
  }
}
