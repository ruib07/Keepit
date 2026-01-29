import { v4 } from "uuid";
import {
  Equipment,
  EquipmentStatus,
} from "../../src/generated/prisma/client.js";

export type EquipmentCreateInput = Partial<Equipment>;

export const generateEquipment = (
  overrides: EquipmentCreateInput = {},
): Equipment => {
  const base = {
    id: v4(),
    name: `Equipment/${v4().slice(0, 8)}`,
    category: "Hardware",
    serialNumber: `SN-${v4().slice(0, 12)}`,
    status: EquipmentStatus.AVAILABLE,
    purchaseDate: new Date(),
    price: 49.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedToId: null,
    assignedById: null,
  };

  return { ...base, ...overrides };
};
