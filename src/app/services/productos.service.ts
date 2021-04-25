import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductosResponse, ProductoResponse } from '../interfaces/producto-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Detalle } from '../interfaces/factura-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProducto(): Observable<Producto[]> {
    return this.http.get<ProductosResponse>('https://exam-commerce-back.herokuapp.com/api/producto').pipe(
      map(resp => {
        return resp.productos;
      })
    );
  }

  getProductoByCodigo(codigo: string): Observable<Detalle> {
    return this.http.get<ProductoResponse>(`https://exam-commerce-back.herokuapp.com/api/producto/codigo/${codigo}`).pipe(
      map(resp => {
        return { 
          producto: resp.producto._id,
          nombreProducto: resp.producto.nombre,
          precioUnitario: resp.producto.precioUnitario,
          cantidad: 1
        };
      })
    );
  }

  crearProducto(producto): Observable<Producto> {
    return this.http.post<ProductoResponse>('https://exam-commerce-back.herokuapp.com/api/producto', producto).pipe(
      map(resp => {
        return resp.producto;
      })
    );
  }
}
