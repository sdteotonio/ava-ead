import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TurmaModel } from 'src/app/modules/private/models/turma.model';
import { ManterTurmaService } from 'src/app/modules/private/services/manter-turma.service';
import { LoginService } from 'src/app/modules/public/services/login.service';

@Component({
  selector: 'app-modal-selecionar-turma',
  templateUrl: './modal-selecionar-turma.component.html',
  styleUrls: ['./modal-selecionar-turma.component.css']
})
export class ModalSelecionarTurmaComponent implements OnInit {
  alunoId: number;
  turmaEvt$: EventEmitter<number> = new EventEmitter();
  listaturmas: TurmaModel[];
  constructor(
    private bsModal: BsModalRef,
    private turmaService: ManterTurmaService,
    private loginSer: LoginService
  ) { }

  ngOnInit() {
    this.turmaService.listarTurmasByAluno(this.alunoId).subscribe(turmas => this.listaturmas = turmas);
  }


  fechar() {
    this.bsModal.hide();
  }


  escolherTurma(id: number) {
    this.turmaEvt$.emit(id);
    this.fechar();
  }

  voltar() {
    this.loginSer.logOut();
    this.fechar();
  }
}
