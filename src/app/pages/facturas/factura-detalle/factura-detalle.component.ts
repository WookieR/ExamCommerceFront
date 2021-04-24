import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detalle, Factura } from 'src/app/interfaces/detalle-interface';
import { DetallesService } from '../../../services/detalles.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent implements OnInit {

  public facturaId: string;

  public factura: Factura;
  public detalles: Detalle[];

  constructor(private activatedRoute: ActivatedRoute, private detallesService: DetallesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.facturaId = params.id;

      this.detallesService.getDetallesByFacturaId(this.facturaId).subscribe(resp => {
        this.factura = resp.factura;
        this.detalles = resp.detalles;
      });

    });
  }

}
