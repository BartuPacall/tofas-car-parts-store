import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasketService } from '../basket.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckoutService } from '../services/checkout.service';

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
  expiryMonthInvalid = false;
  constructor(
    private basketService: BasketService,
    private sanitizer: DomSanitizer,
    private checkoutService: CheckoutService
  ) {}

  onSubmit() {
    if (this.paymentForm.invalid) return;

    const paymentPayload = { ...this.paymentData };

    this.checkoutService.submitPayment(paymentPayload).subscribe({
      next: (res) => {
        console.log('Ödeme başarılı:', res);
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
      },
      error: (err) => {
        console.error('Ödeme sırasında hata:', err);
        alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
      },
    });
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
    this.expiryMonthInvalid = false;

    if (rawValue.length > 4) rawValue = rawValue.substring(0, 4);

    if (rawValue.length >= 2) {
      let month = rawValue.substring(0, 2);
      let year = rawValue.substring(2);

      let monthNumber = parseInt(month, 10);

      if (monthNumber > 12) {
        this.expiryMonthInvalid = true;
      }

      this.paymentData.expiry = year ? `${month}/${year}` : `${month}`;
    } else {
      this.paymentData.expiry = rawValue;
    }
  }
}
