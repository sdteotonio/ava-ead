import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  pergunta: string;
  titulo: string;

  confirm$: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  confirmar(co: boolean) {
    this.confirm$.emit(co);
    this.fecharModal();
  }

  fecharModal() {
    this.modalRef.hide();
  }

}
