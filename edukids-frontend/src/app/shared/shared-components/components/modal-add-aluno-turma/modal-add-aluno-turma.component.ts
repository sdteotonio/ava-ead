import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { AlunoModel } from 'src/app/modules/private/models/aluno.model';
import { TurmaModel } from 'src/app/modules/private/models/turma.model';
import { ManterAlunoService } from 'src/app/modules/private/services/manter-aluno.service';
import { ManterTurmaService } from 'src/app/modules/private/services/manter-turma.service';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';

@Component({
  selector: 'app-modal-add-aluno-turma',
  templateUrl: './modal-add-aluno-turma.component.html',
  styleUrls: ['./modal-add-aluno-turma.component.css']
})
export class ModalAddAlunoTurmaComponent implements OnInit, AfterViewInit {

  turma: TurmaModel;
  alunos: AlunoModel[];

  close$: EventEmitter<any> = new EventEmitter();

  dis = true;
  constructor(
    private ref: BsModalRef,
    private toastr: ToastrService,
    private manterTurma: ManterTurmaService,
    private alunosService: ManterAlunoService
  ) { }

  ngAfterViewInit(): void {
    this.consultarAlunos();
  }
  ngOnInit() {
  }

  consultarAlunos() {
    if (this.turma.id) {
      this.manterTurma.recuperarTurma(this.turma.id).subscribe(turma => {
        this.dis = false;
        this.turma = turma;
      });
      this.alunosService.listarAlunoes().subscribe(alunos => this.alunos = alunos);
    }
  }

  salvar() {
    this.manterTurma.atualizarTurma(this.turma).subscribe(() => {
      this.toastr.success(MensagemEnum.DADOS_ATUALIZADO.replace('VALUE', 'Turma'));
      this.close$.emit();
      this.fechar();
    });
  }

  selecionadosEvt(listaSelecionados: NgxSelectOption[]) {
    this.turma.alunos = listaSelecionados.map(item => item.data.id);
  }

  fechar() {
    this.ref.hide();
  }



}
