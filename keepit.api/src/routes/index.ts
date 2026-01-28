import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authenticationsRoutes } from "./authentications.routes.js";
import { equipmentsRoutes } from "./equipments.routes.js";
import { usersRoutes } from "./users.routes.js";

export const routes = (app: express.Express) => {
  app.use("/auth", authenticationsRoutes);

  app.use("/users", authMiddleware, usersRoutes);
  app.use("/equipments", authMiddleware, equipmentsRoutes);
};
