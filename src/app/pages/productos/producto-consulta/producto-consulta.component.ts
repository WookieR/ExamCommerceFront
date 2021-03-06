import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../interfaces/producto-interface';

@Component({
  selector: 'app-producto-consulta',
  templateUrl: './producto-consulta.component.html',
  styleUrls: ['./producto-consulta.component.css']
})
export class ProductoConsultaComponent implements OnInit {

  public cargando: boolean = false;

  public productos: Producto[];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.productosService.getProducto().subscribe(resp => {
      this.productos = resp;
      this.cargando = false;
    });
  }

}
