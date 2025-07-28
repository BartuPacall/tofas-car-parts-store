import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Parca {
  id: number;
  ad: string;
  marka: string;
  fiyat: number;
  stokAdedi: number;
}

@Injectable({ providedIn: 'root' })
export class ParcaService {
  private apiUrl = 'https://localhost:5000/api/Parca'; // URL doğru olmalı

  constructor(private http: HttpClient) {}

  getParcalar(): Observable<Parca[]> {
    return this.http.get<Parca[]>(this.apiUrl);
  }

  createParca(parca: Parca): Observable<Parca> {
    return this.http.post<Parca>(this.apiUrl, parca);
  }

  updateParca(id: number, parca: Parca): Observable<Parca> {
    return this.http.put<Parca>(`${this.apiUrl}/${id}`, parca);
  }

  deleteParca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
