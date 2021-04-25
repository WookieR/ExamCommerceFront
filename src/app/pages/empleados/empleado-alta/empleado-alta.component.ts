import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs/operators';
import { EmpleadosService } from '../../../services/empleados.service';
import { AlertasService } from '../../../services/alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-alta',
  templateUrl: './empleado-alta.component.html',
  styleUrls: ['./empleado-alta.component.css']
})
export class EmpleadoAltaComponent implements OnInit {

  public empleadoForm: FormGroup;

  public cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private alertasService: AlertasService,
    private router: Router) {
    this.construirForm();
  }

  construirForm(){
    this.empleadoForm = this.fb.group({
      legajo: ['', [Validators.required], []],
      nombre: ['', [Validators.required], []],
      apellido: ['', [Validators.required], []],
      fechaNacimiento: ['', [Validators.required], []],
      dni: ['', [Validators.required], []],
      edad: ['', [Validators.required], []]
    });
  }

  ngOnInit(): void {
  }

  crearEmpleado(): void{
    this.cargando = true;
    if (this.empleadoForm.valid){
      this.empleadosService.crearEmpleado(this.empleadoForm.value).subscribe(resp => {
        this.alertasService.alertaSuccess('Empleado Creado', 'El empleado se creo satisfactoriamente');
        this.cargando = false;
        this.router.navigate(['/main', 'empleados']);
      });
    } else {
      this.cargando = false;
      this.alertasService.alertaError('Todos los campos son requeridos');
    }
  }

}
