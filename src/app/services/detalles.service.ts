import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallesResponse } from '../interfaces/detalle-interface';

@Injectable({
  providedIn: 'root'
})
export class DetallesService {

  constructor(private http: HttpClient) { }

  getDetallesByFacturaId(facturaId: string): Observable<DetallesResponse>{
    return this.http.get<DetallesResponse>(`http://localhost:3000/api/factura/${facturaId}`);
  }
}
