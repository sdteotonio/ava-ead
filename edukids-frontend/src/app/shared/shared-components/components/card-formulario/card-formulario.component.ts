import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-formulario',
  templateUrl: './card-formulario.component.html',
  styleUrls: ['./card-formulario.component.css']
})
export class CardFormularioComponent implements OnInit {
  @Input() imagem: string;
  constructor() { }

  ngOnInit() {
  }

}
