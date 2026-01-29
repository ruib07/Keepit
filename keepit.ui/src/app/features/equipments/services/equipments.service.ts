import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { EquipmentResponse } from '../../../shared/equipment';

@Injectable({ providedIn: 'root' })
export class EquipmentsService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/equipments`;

  getAll() {
    return this.http.get<EquipmentResponse[]>(this.baseUrl);
  }
}
