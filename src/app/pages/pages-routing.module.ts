import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadoConsultaComponent } from './empleados/empleado-consulta/empleado-consulta.component';
import { ClienteConsultaComponent } from './clientes/cliente-consulta/cliente-consulta.component';
import { ProductoConsultaComponent } from './productos/producto-consulta/producto-consulta.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClienteFacturasComponent } from './clientes/cliente-facturas/cliente-facturas.component';
import { FacturaDetalleComponent } from './facturas/factura-detalle/factura-detalle.component';
import { EmpleadoAltaComponent } from './empleados/empleado-alta/empleado-alta.component';
import { ClienteAltaComponent } from './clientes/cliente-alta/cliente-alta.component';
import { ProductoAltaComponent } from './productos/producto-alta/producto-alta.component';

const routes: Routes = [
  {path: 'main', component: MainComponent, children: [
    {path: '', component: DashboardComponent},

    {path: 'empleados', component: EmpleadoConsultaComponent},
    {path: 'empleados/nuevo', component: EmpleadoAltaComponent},

    {path: 'clientes', component: ClienteConsultaComponent},
    {path: 'clientes/nuevo', component: ClienteAltaComponent},
    {path: 'clientes/facturas/:id', component: ClienteFacturasComponent},

    {path: 'facturas/:id', component: FacturaDetalleComponent},
    
    {path: 'productos', component: ProductoConsultaComponent},
    {path: 'productos/nuevo', component: ProductoAltaComponent},

    {path: 'punto-venta', component: PuntoVentaComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
