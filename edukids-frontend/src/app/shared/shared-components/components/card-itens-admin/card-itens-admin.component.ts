import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-itens-admin',
  templateUrl: './card-itens-admin.component.html',
  styleUrls: ['./card-itens-admin.component.css']
})
export class CardItensAdminComponent implements OnInit {

  @Input()
  titulo: string;

  @Input()
  color: string;

  @Input()
  descricao: string;

  @Output()
  adicionarEvt: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  adicionar() {
    this.adicionarEvt.emit();
  }


}
