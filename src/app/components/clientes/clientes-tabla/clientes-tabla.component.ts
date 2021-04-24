import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente-interface';

@Component({
  selector: 'app-clientes-tabla',
  templateUrl: './clientes-tabla.component.html',
  styleUrls: ['./clientes-tabla.component.css']
})
export class ClientesTablaComponent implements OnInit {

  @Input() clientes: Cliente[];

  constructor() { }

  ngOnInit(): void {
  }

}
