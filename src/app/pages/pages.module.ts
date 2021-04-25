import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { EmpleadoConsultaComponent } from './empleados/empleado-consulta/empleado-consulta.component';
import { ClienteConsultaComponent } from './clientes/cliente-consulta/cliente-consulta.component';
import { ProductoConsultaComponent } from './productos/producto-consulta/producto-consulta.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClienteFacturasComponent } from './clientes/cliente-facturas/cliente-facturas.component';
import { FacturaDetalleComponent } from './facturas/factura-detalle/factura-detalle.component';
import { EmpleadoAltaComponent } from './empleados/empleado-alta/empleado-alta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteAltaComponent } from './clientes/cliente-alta/cliente-alta.component';
import { ProductoAltaComponent } from './productos/producto-alta/producto-alta.component';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    EmpleadoConsultaComponent,
    ClienteConsultaComponent,
    ProductoConsultaComponent,
    PuntoVentaComponent,
    ClienteFacturasComponent,
    FacturaDetalleComponent,
    EmpleadoAltaComponent,
    ClienteAltaComponent,
    ProductoAltaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
