import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasketService } from '../basket.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  @ViewChild('paymentForm') paymentForm!: NgForm;

  paymentData = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '', // adres alanı
  };

  mapUrl: SafeResourceUrl | null = null;
  paymentSuccess = false;

  constructor(
    private basketService: BasketService,
    private sanitizer: DomSanitizer
  ) {}

  onSubmit() {
    if (this.paymentForm.invalid) return;

    const today = new Date();
    const formattedDate = today.toLocaleString(); // Örn: 25.07.2025 17:45:12

    console.log('Ödeme bilgileri:', {
      ...this.paymentData,
      date: formattedDate,
    });

    setTimeout(() => {
      this.paymentSuccess = true;
      this.basketService.clearCart();

      this.paymentForm.resetForm({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        address: '',
      });

      this.mapUrl = null;
    }, 1000);
  }

  updateMapUrl() {
    if (!this.paymentData.address) {
      this.mapUrl = null;
      return;
    }

    const encodedAddress = encodeURIComponent(this.paymentData.address);
    const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  formatCardNumber() {
    let rawValue = this.paymentData.cardNumber.replace(/\D/g, '');
    rawValue = rawValue.substring(0, 16);
    const formatted = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.paymentData.cardNumber = formatted;
  }

  formatExpiry() {
    let rawValue = this.paymentData.expiry.replace(/\D/g, '');
    if (rawValue.length > 4) rawValue = rawValue.substring(0, 4);
    if (rawValue.length > 2) {
      this.paymentData.expiry = rawValue.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else {
      this.paymentData.expiry = rawValue;
    }
  }
}
