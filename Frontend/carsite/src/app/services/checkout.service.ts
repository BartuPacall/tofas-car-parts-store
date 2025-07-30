import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'https://localhost:5000/api/Payment'; // Backend URL

  constructor(private http: HttpClient) {}

  submitPayment(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentData);
  }
}
