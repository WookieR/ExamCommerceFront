import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { EmpleadosTablaComponent } from './empleados/empleados-tabla/empleados-tabla.component';
import { EmpleadosFilaComponent } from './empleados/empleados-fila/empleados-fila.component';
import { ClientesTablaComponent } from './clientes/clientes-tabla/clientes-tabla.component';
import { ProductosTablaComponent } from './productos/productos-tabla/productos-tabla.component';
import { ClienteFacturasTablaComponent } from './clientes/cliente-facturas-tabla/cliente-facturas-tabla.component';

@NgModule({
  declarations: [
    NavbarComponent,
    EmpleadosTablaComponent,
    EmpleadosFilaComponent,
    ClientesTablaComponent,
    ProductosTablaComponent,
    ClienteFacturasTablaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    EmpleadosTablaComponent,
    ClientesTablaComponent,
    ProductosTablaComponent,
    ClienteFacturasTablaComponent
  ]
})
export class ComponentsModule { }
