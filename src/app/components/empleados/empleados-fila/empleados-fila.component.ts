import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/empleado-interface';

@Component({
  selector: 'app-empleados-fila',
  templateUrl: './empleados-fila.component.html',
  styleUrls: ['./empleados-fila.component.css']
})
export class EmpleadosFilaComponent implements OnInit {

  @Input() empleado: Empleado;

  constructor() { }

  ngOnInit(): void {
  }

}
