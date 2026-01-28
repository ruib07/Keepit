import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  accelerateUrl: process.env.ACCELERATEURL!,
});

export default prisma;
