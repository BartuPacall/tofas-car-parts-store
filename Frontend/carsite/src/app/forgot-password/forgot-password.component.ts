import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private snackBar: MatSnackBar) {}

  onSubmit(): void {
    if (!this.email || !this.email.includes('@')) {
      this.snackBar.open('Geçerli bir e-posta adresi giriniz.', 'Kapat', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.snackBar.open(
      'Şifre sıfırlama bağlantısı gönderildi: ' + this.email,
      'Kapat',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );

    this.email = '';
  }
}
