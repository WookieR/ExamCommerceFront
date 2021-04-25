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
    return this.http.get<ClientesResponse>('https://exam-commerce-back.herokuapp.com/api/cliente').pipe(
      map( resp => {
        return resp.clientes;
      })
    );
  }

  getClienteById(id: string): Observable<Cliente>{
    return this.http.get<ClienteResponse>(`https://exam-commerce-back.herokuapp.com/api/cliente/${id}`).pipe(
      map(resp => {
        return resp.cliente;
      })
    );
  }

  getClienteByTarjeta(tarjeta: string): Observable<Cliente>{
    return this.http.get<ClienteResponse>(`https://exam-commerce-back.herokuapp.com/api/cliente/tarjeta/${tarjeta}`).pipe(
      map( resp => {
        return resp.cliente;
      })
    );
  }

  crearCliente(cliente): Observable<Cliente>{
    return this.http.post<ClienteResponse>('https://exam-commerce-back.herokuapp.com/api/cliente', cliente).pipe(
      map(resp => {
        return resp.cliente;
      })
    );
  }
}
