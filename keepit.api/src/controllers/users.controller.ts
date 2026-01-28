import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
  static async getAll(req: Request, res: Response) {
    res.send(await new UserService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const userId = req.params.id as string;

    res.send(await new UserService().getById(userId));
  }

  static async update(req: Request, res: Response) {
    const userId = req.params.id as string;
    const user = req.body as Prisma.UserUpdateInput;

    await new UserService().update(userId, user);

    res.send({
      message: "User updated successfully.",
    });
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params.id as string;

    await new UserService().delete(userId);

    res.status(204).end();
  }
}
