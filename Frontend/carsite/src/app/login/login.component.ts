import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    // Admin için fake login
    if (this.username === 'admin' && this.password === 'admin') {
      this.authService.loginAsAdmin();
      this.authService.setUserRole('admin');

      this.snackBar.open('Giriş başarılı!', 'Kapat', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.router.navigate(['/brands']);
      this.username = '';
      this.password = '';
      return;
    }

    // Diğer kullanıcılar için gerçek login
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.snackBar.open('Giriş başarılı!', 'Kapat', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        this.authService.setUserRole('user');
        this.router.navigate(['/brands']);
        this.username = '';
        this.password = '';
      },
      error: () => {
        this.snackBar.open('Geçersiz kimlik bilgileri', 'Kapat', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
