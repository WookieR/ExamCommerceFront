import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-alta',
  templateUrl: './cliente-alta.component.html',
  styleUrls: ['./cliente-alta.component.css']
})
export class ClienteAltaComponent implements OnInit {

  public clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clientesService: ClientesService) {
    this.construirForm();
  }

  construirForm(): void{
    this.clienteForm = this.fb.group({
      tarjetaCredito: ['', [], []],
      nombre: ['', [], []],
      apellido: ['', [],[]],
      fechaDeNacimiento: ['', [], []],
      dni: ['', [], []],
      edad: ['', [], []]
    });
  }

  ngOnInit(): void {
  }

  crearCliente(): void{
    if (this.clienteForm.valid){
      this.clientesService.crearCliente(this.clienteForm.value).subscribe(resp => {
        console.log(resp);
      });
    }
  }

}
