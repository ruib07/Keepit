import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { EquipmentResponse } from '../../../../shared/equipment';
import { EquipmentsService } from '../../services/equipments.service';

@Component({
  selector: 'app-equipments',
  imports: [DatePipe],
  templateUrl: './equipments.html',
})
export class Equipments {
  private equipmentsService = inject(EquipmentsService);
  private platformId = inject(PLATFORM_ID);

  public allEquipments = signal<EquipmentResponse[]>([]);

  public currentPage = signal(1);
  public pageSize = 10;

  public pagedEquipments = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.allEquipments().slice(startIndex, startIndex + this.pageSize);
  });

  public totalPages = computed(() => Math.ceil(this.allEquipments().length / this.pageSize));

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEquipments();
    }
  }

  loadEquipments() {
    this.equipmentsService.getAll().subscribe({
      next: (data) => this.allEquipments.set(data),
      error: (err) => console.error(err),
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
