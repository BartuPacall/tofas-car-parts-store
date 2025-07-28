import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IletisimService, IletisimModel } from '../services/iletisim.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(
    private snackBar: MatSnackBar,
    private iletisimService: IletisimService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.controls['email']?.valid) {
      this.snackBar.open(
        'Lütfen geçerli bir e-posta adresi giriniz.',
        'Kapat',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
      return;
    }

    if (form.valid) {
      const iletisimVerisi: IletisimModel = {
        adSoyad: form.value.adSoyad,
        email: form.value.email,
        mesaj: form.value.mesaj,
      };

      this.iletisimService.mesajGonder(iletisimVerisi).subscribe({
        next: () => {
          this.snackBar.open('Mesaj gönderildi.', 'Kapat', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          form.resetForm();
        },
        error: () => {
          this.snackBar.open('Mesaj gönderilirken hata oluştu.', 'Kapat', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
