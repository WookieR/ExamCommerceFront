import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../interfaces/producto-interface';

@Component({
  selector: 'app-productos-tabla',
  templateUrl: './productos-tabla.component.html',
  styleUrls: ['./productos-tabla.component.css']
})
export class ProductosTablaComponent implements OnInit {

  @Input() productos: Producto[];

  constructor() { }

  ngOnInit(): void {
  }

}
