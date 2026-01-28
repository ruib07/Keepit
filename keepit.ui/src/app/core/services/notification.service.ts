import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['bg-green-600', 'text-white'], 
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['bg-red-600', 'text-white'],
    });
  }
}
  