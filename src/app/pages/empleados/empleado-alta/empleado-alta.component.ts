import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ignoreElements } from 'rxjs/operators';
import { EmpleadosService } from '../../../services/empleados.service';

@Component({
  selector: 'app-empleado-alta',
  templateUrl: './empleado-alta.component.html',
  styleUrls: ['./empleado-alta.component.css']
})
export class EmpleadoAltaComponent implements OnInit {

  public empleadoForm: FormGroup;

  constructor(private fb: FormBuilder, private empleadosService: EmpleadosService) {
    this.construirForm();
  }

  construirForm(){
    this.empleadoForm = this.fb.group({
      legajo: ['', [], []],
      nombre: ['', [], []],
      apellido: ['', [], []],
      fechaNacimiento: ['', [], []],
      dni: ['', [], []],
      edad: ['', [], []]
    });
  }

  ngOnInit(): void {
  }

  crearEmpleado(): void{
    if (this.empleadoForm.valid){
      this.empleadosService.crearEmpleado(this.empleadoForm.value).subscribe(resp => {
        console.log(resp);
      });
    }
  }

}
