import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userRole: string | null = null;
  dropdownOpen: boolean = false; // Dropdown açık/kapalı durumu

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
      if (!role) {
        this.dropdownOpen = false; // Giriş yoksa dropdown kapalı olsun
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
  }
}
