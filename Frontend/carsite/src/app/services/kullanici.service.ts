import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Kullanici {
  id: number;
  kullaniciAdi: string;
  rol: string;
  sifre: string;
}

@Injectable({
  providedIn: 'root',
})
export class KullaniciService {
  private apiUrl = `${environment.apiUrl}/Kullanici`;

  constructor(private http: HttpClient) {}

  getKullanicilar(): Observable<Kullanici[]> {
    return this.http.get<Kullanici[]>(this.apiUrl);
  }

  createKullanici(kullanici: Kullanici): Observable<Kullanici> {
    return this.http.post<Kullanici>(this.apiUrl, kullanici);
  }

  updateKullanici(id: number, kullanici: Kullanici): Observable<Kullanici> {
    return this.http.put<Kullanici>(`${this.apiUrl}/${id}`, kullanici);
  }

  deleteKullanici(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
