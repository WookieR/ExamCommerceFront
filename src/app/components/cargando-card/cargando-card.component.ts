import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargando-card',
  templateUrl: './cargando-card.component.html',
  styleUrls: ['./cargando-card.component.css']
})
export class CargandoCardComponent implements OnInit {

  @Input() texto: string;

  constructor() { }

  ngOnInit(): void {
  }

}
