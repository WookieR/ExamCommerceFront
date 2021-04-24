import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-producto-alta',
  templateUrl: './producto-alta.component.html',
  styleUrls: ['./producto-alta.component.css']
})
export class ProductoAltaComponent implements OnInit {

  public productoForm: FormGroup;

  constructor(private fb: FormBuilder, private productosService: ProductosService) {
    this.construirForm();
  }

  construirForm(){
    this.productoForm = this.fb.group({
      codigo: ['', [], []],
      nombre: ['', [], []],
      marca: ['', [], []],
      fechaVencimiento: ['', [], []],
      precioUnitario: ['', [], []],
      proveedor: ['', [], []]
    });
  }

  ngOnInit(): void {
  }

  crearProducto(): void{
    if (this.productoForm.valid){
      this.productosService.crearProducto(this.productoForm.value).subscribe(resp => {
        console.log(resp);
      });
    }
  }

}
