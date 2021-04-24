import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente-interface';
import { ClienteFactura, Factura } from 'src/app/interfaces/facturas-respuesta-interface';
import { FacturasService } from '../../../services/facturas.service';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-facturas',
  templateUrl: './cliente-facturas.component.html',
  styleUrls: ['./cliente-facturas.component.css']
})
export class ClienteFacturasComponent implements OnInit {

  public clienteId: string;

  public cliente: Cliente;

  public facturas: ClienteFactura[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private facturasService: FacturasService,
    private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.clienteId = params.id;
      this.clientesService.getClienteById(this.clienteId).subscribe(resp => {
        this.cliente = resp;
      });
      this.facturasService.getByClienteId(this.clienteId).subscribe(resp => {
        this.facturas = resp;
      });
    });

  }

}
