import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteFactura, ClienteFacturasResponse, Factura, FacturaResponse, FacturasResponse } from '../interfaces/facturas-respuesta-interface';
import { FacturaModelo } from '../interfaces/factura-interface';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  getByClienteId(clienteId: string): Observable<ClienteFactura[]>{
    return this.http.get<ClienteFacturasResponse>(`http://localhost:3000/api/factura/cliente/${clienteId}`).pipe(
      map( resp => {
        return resp.facturas;
      })
    );
  }

  nuevaVenta(factura: FacturaModelo): Observable<Factura>{
    return this.http.post<FacturaResponse>(`http://localhost:3000/api/factura`, factura).pipe(
      map(resp => {
        return resp.factura;
      })
    );
  }
}
