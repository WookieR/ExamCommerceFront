import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../services/empleados.service';
import { Empleado } from '../../../interfaces/empleado-interface';

@Component({
  selector: 'app-empleado-consulta',
  templateUrl: './empleado-consulta.component.html',
  styleUrls: ['./empleado-consulta.component.css']
})
export class EmpleadoConsultaComponent implements OnInit {

  public empleados: Empleado[];

  public cargando: boolean = false;

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.empleadosService.getEmpleados().subscribe(resp => {
      this.empleados = resp;
      this.cargando = false;
    });
  }

}
