// src/app/register/register.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email.includes('@')) {
      alert('Lütfen geçerli bir email adresi giriniz (örn. e-posta@ornek.com)');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConfirm: this.confirmPassword,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        alert('Kayıt başarılı!');

        // Token varsa sakla ve yönlendir
        if (response.token) {
          this.authService.setToken(response.token); // ✅ Doğru yer
          this.router.navigate(['/brands']); // ✅ Uygun rota
        } else {
          this.router.navigate(['/login']);
        }

        // Form temizleme
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      error: () => {
        alert('Kayıt başarısız!');
      },
    });
  }
}
