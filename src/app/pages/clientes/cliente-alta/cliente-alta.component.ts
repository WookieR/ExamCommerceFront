import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { AlertasService } from '../../../services/alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-alta',
  templateUrl: './cliente-alta.component.html',
  styleUrls: ['./cliente-alta.component.css']
})
export class ClienteAltaComponent implements OnInit {

  public clienteForm: FormGroup;

  public cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private alertasService: AlertasService,
    private router: Router) {
    this.construirForm();
  }

  construirForm(): void{
    this.clienteForm = this.fb.group({
      tarjetaCredito: ['', [Validators.required], []],
      nombre: ['', [Validators.required], []],
      apellido: ['', [Validators.required],[]],
      fechaDeNacimiento: ['', [Validators.required], []],
      dni: ['', [Validators.required], []],
      edad: ['', [Validators.required], []]
    });
  }

  ngOnInit(): void {
  }

  crearCliente(): void{
    this.cargando = true;
    if (this.clienteForm.valid){
      this.clientesService.crearCliente(this.clienteForm.value).subscribe(resp => {
        this.alertasService.alertaSuccess('Cliente Creado', 'El cliente se creo satisfactoriamente');
        this.cargando = false;
        this.router.navigate(['/main', 'clientes']);
      });
    } else {
      this.alertasService.alertaError('Todos los campos son requeridos');
      this.cargando = false;
    }
  }

}
