import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { AlertasService } from '../../../services/alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-alta',
  templateUrl: './producto-alta.component.html',
  styleUrls: ['./producto-alta.component.css']
})
export class ProductoAltaComponent implements OnInit {

  public productoForm: FormGroup;

  public cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private alertasService: AlertasService,
    private router: Router) {
    this.construirForm();
  }

  construirForm(){
    this.productoForm = this.fb.group({
      codigo: ['', [Validators.required], []],
      nombre: ['', [Validators.required], []],
      marca: ['', [Validators.required], []],
      fechaVencimiento: ['', [Validators.required], []],
      precioUnitario: ['', [Validators.required], []],
      proveedor: ['', [Validators.required], []]
    });
  }

  ngOnInit(): void {
  }

  crearProducto(): void{
    this.cargando = true;
    if (this.productoForm.valid){
      this.productosService.crearProducto(this.productoForm.value).subscribe(resp => {
        this.alertasService.alertaSuccess('Producto Creado', 'El producto se creo satisfactoriamente');
        this.cargando = false;
        this.router.navigate(['/main', 'productos']);
      });
    } else {
      this.alertasService.alertaError('Todos los campos son requeridos');
      this.cargando = false;
    }
  }

}
