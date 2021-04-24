import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/empleado-interface';

@Component({
  selector: 'app-empleados-tabla',
  templateUrl: './empleados-tabla.component.html',
  styleUrls: ['./empleados-tabla.component.css']
})
export class EmpleadosTablaComponent implements OnInit {

  @Input() empleados: Empleado[];

  constructor() { }

  ngOnInit(): void {
  }

}
