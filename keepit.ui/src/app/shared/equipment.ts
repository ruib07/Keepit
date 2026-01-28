import { EquipmentStatus } from './enum';

export interface EquipmentRequest {
  name: string;
  category: string;
  serialNumber: string;
  status?: EquipmentStatus;
  purchaseDate: string;
  price: number;
  assignedToId?: string | null;
  assignedById?: string | null;
}

export interface EquipmentResponse {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: EquipmentStatus;
  purchaseDate: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  assignedToId: string | null;
  assignedById: string | null;
}
