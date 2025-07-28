// src/app/services/iletisim.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IletisimModel {
  adSoyad: string;
  email: string;
  mesaj: string;
}

@Injectable({
  providedIn: 'root',
})
export class IletisimService {
  private apiUrl = 'https://localhost:5000/api/Iletisim'; // API endpoint’in burası olmalı

  constructor(private http: HttpClient) {}

  mesajGonder(iletisim: IletisimModel): Observable<any> {
    return this.http.post(this.apiUrl, iletisim);
  }

  getMessages(): Observable<IletisimModel[]> {
    return this.http.get<IletisimModel[]>(this.apiUrl);
  }
  deleteMessage(message: IletisimModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, message);
  }
}
