import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { EmpleadosResponse, Empleado, EmpleadoResponse } from '../interfaces/empleado-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<EmpleadosResponse>('https://exam-commerce-back.herokuapp.com/api/empleado').pipe(
      map( (resp) => {
        return resp.empleados;
      })
    );
  }

  getEmpleadoByLegajo(legajo: string): Observable<Empleado>{
    return this.http.get<EmpleadoResponse>(`https://exam-commerce-back.herokuapp.com/api/empleado/legajo/${legajo}`).pipe(
      map((resp) => {
        return resp.empleado;
      })
    );
  }

  crearEmpleado(nuevoEmpleado): Observable<Empleado>{
    return this.http.post<EmpleadoResponse>(`https://exam-commerce-back.herokuapp.com/api/empleado`, nuevoEmpleado).pipe(
      map(resp => {
        return resp.empleado;
      })
    );
  }
}
