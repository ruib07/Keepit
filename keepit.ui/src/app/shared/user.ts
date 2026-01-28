import { EquipmentResponse } from './equipment';

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  department: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  department: string;
  equipments?: EquipmentResponse[];
  assignedLogs?: EquipmentResponse[];
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
}
