import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente-interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

  public cargando: boolean = false;

  public clientes: Cliente[];

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.clientesService.getClientes().subscribe(resp => {
      this.clientes = resp;
      this.cargando = false;
    });
  }

}
