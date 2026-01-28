import { Router } from "express";
import asyncHandler from "express-async-handler";
import { EquipmentsController } from "../controllers/equipments.controller.js";

export const equipmentsRoutes = Router();

equipmentsRoutes.get("/", asyncHandler(EquipmentsController.getAll));
equipmentsRoutes.get("/:id", asyncHandler(EquipmentsController.getById));
equipmentsRoutes.post("/", asyncHandler(EquipmentsController.create));
equipmentsRoutes.patch(
  "/:id/assign",
  asyncHandler(EquipmentsController.assign),
);
equipmentsRoutes.put("/:id", asyncHandler(EquipmentsController.update));
equipmentsRoutes.delete("/:id", asyncHandler(EquipmentsController.delete));
