import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Detalle, FacturaModelo } from '../../interfaces/factura-interface';
import { Cliente } from '../../interfaces/cliente-interface';
import { Empleado } from '../../interfaces/empleado-interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { FacturasService } from '../../services/facturas.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css']
})
export class PuntoVentaComponent implements OnInit {

  public factura: FacturaModelo;

  public empleado: Empleado;

  public cliente: Cliente;

  public detalles: Detalle[];

  public total: number;

  constructor(
    private empleadosService: EmpleadosService,
    private clientesService: ClientesService,
    private productosService: ProductosService,
    private facturasService: FacturasService,
    private alertasService: AlertasService) { }

  ngOnInit(): void {
    this.detalles = [];
    this.iniciarFactura();
    this.total = 0;
  }

  iniciarFactura(): void{
    this.factura = {
      numeroFactura: '',
      cliente: '',
      empleado: '',
      detalles: [],
      total: 0
    };
  }

  cargarEmpleado(legajo: string): void{
    if(legajo.length < 1){
      return this.alertasService.alertaError('Debe introducir un legajo valido');
    }

    this.empleadosService.getEmpleadoByLegajo(legajo).subscribe(resp => {
      this.empleado = resp;
      this.factura.empleado = this.empleado._id;
    }, error => {
      this.alertasService.alertaError(error.error.message);
    });
  }

  cargarCliente(tarjeta: string): void{
    if(tarjeta.length < 1){
      return this.alertasService.alertaError('Debe introducir un numero de tarjeta valido');
    }

    this.clientesService.getClienteByTarjeta(tarjeta).subscribe( resp => {
      this.cliente = resp;
      this.factura.cliente = this.cliente._id;
    }, error => {
      this.alertasService.alertaError(error.error.message);
    });
  }

  cargarProducto(codigo: string): void{
    if(codigo.length < 1){
      return this.alertasService.alertaError('Debe introducir un codigo valido');
    }

    let existe = false;
    this.productosService.getProductoByCodigo(codigo).subscribe(resp => {
      this.detalles.forEach(detalle => {
        if(detalle.producto == resp.producto){
          detalle.cantidad ++;
          existe = true;
        }
      });

      if(!existe){
        this.detalles.push(resp);
      }
      this.actualizarTotal();
    }, error => {
      this.alertasService.alertaError(error.error.message);
    });
  }

  quitarProducto(i) : void{
    this.detalles.splice(i, 1);
    this.actualizarTotal();
  }

  aumentarDetalle(detalle: Detalle): void{
    detalle.cantidad ++;
    this.actualizarTotal();
  }

  disminuirDetalle(detalle: Detalle): void{
    if(detalle.cantidad > 1){
      detalle.cantidad --;
    }
    this.actualizarTotal();
  }

  actualizarTotal(): void{
    this.total = 0;
    this.detalles.forEach(detalle => {
      this.total += detalle.precioUnitario * detalle.cantidad;
    });
  }

  realizarVenta(): void{
    this.factura.numeroFactura = new Date().getTime().toString();
    this.factura.total = 0;
    this.detalles.forEach(detalle => {
      this.factura.total += detalle.precioUnitario * detalle.cantidad;
    });
    this.factura.detalles = this.detalles;

    this.facturasService.nuevaVenta(this.factura).subscribe(resp => {
      this.iniciarFactura();
      this.cliente = null;
      this.factura.empleado = this.empleado._id;
      this.detalles = [];
      this.actualizarTotal();
      this.alertasService.alertaSuccess('Venta Realizada', 'La venta se realizo satisfactoriamente');
    }, error => {
      this.alertasService.alertaError(error.error.message);
    });
  }





}
