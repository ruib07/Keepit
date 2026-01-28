import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    department: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;

      this.authService.signUp(credentials).subscribe({
        next: (response: any) => {
          this.notification.success('Conta criada com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.notification.error(`Erro ao criar conta: ${err}`);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
