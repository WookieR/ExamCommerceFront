import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente, ClientesResponse, ClienteResponse } from '../interfaces/cliente-interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<ClientesResponse>('http://localhost:3000/api/cliente').pipe(
      map( resp => {
        return resp.clientes;
      })
    );
  }

  getClienteById(id: string): Observable<Cliente>{
    return this.http.get<ClienteResponse>(`http://localhost:3000/api/cliente/${id}`).pipe(
      map(resp => {
        return resp.cliente;
      })
    );
  }

  getClienteByTarjeta(tarjeta: string): Observable<Cliente>{
    return this.http.get<ClienteResponse>(`http://localhost:3000/api/cliente/tarjeta/${tarjeta}`).pipe(
      map( resp => {
        return resp.cliente;
      })
    );
  }

  crearCliente(cliente): Observable<Cliente>{
    return this.http.post<ClienteResponse>('http://localhost:3000/api/cliente', cliente).pipe(
      map(resp => {
        return resp.cliente;
      })
    );
  }
}
