import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteFactura } from '../../../interfaces/facturas-respuesta-interface';

@Component({
  selector: 'app-cliente-facturas-tabla',
  templateUrl: './cliente-facturas-tabla.component.html',
  styleUrls: ['./cliente-facturas-tabla.component.css']
})
export class ClienteFacturasTablaComponent implements OnInit {

  @Input() facturas: ClienteFactura[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
