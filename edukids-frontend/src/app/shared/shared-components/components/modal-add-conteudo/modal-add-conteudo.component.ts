import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConteudoService } from 'src/app/core/services/conteudo.service';
import { DisciplinaService } from 'src/app/core/services/disciplina.service';
import { TurmaModel } from 'src/app/modules/private/models/turma.model';
import { TipoConteudoEnum, TipoConteudoEnumIcone, TipoConteudoEnumMensagem } from 'src/app/shared/shared-models/enum/conteudo.enum';
import { DisciplinaEnum, DisciplinaEnumIcone } from 'src/app/shared/shared-models/enum/disciplina.enum';
import { ConteudoModel } from 'src/app/shared/shared-models/interface/conteudo.model';
import { DisciplinaModel } from 'src/app/shared/shared-models/interface/disciplina.model';

@Component({
  selector: 'app-modal-add-conteudo',
  templateUrl: './modal-add-conteudo.component.html',
  styleUrls: ['./modal-add-conteudo.component.css']
})
export class ModalAddConteudoComponent implements OnInit {
  turma: TurmaModel;
  DisciplinaEnum = DisciplinaEnum;
  DisciplinaEnumIcone = DisciplinaEnumIcone;

  funcoes = {
    [DisciplinaEnum.PT]: () => { this.consultarPt(); },
    [DisciplinaEnum.CI]: () => { this.consultarCi(); },
    [DisciplinaEnum.HI]: () => { this.consultarHi(); },
    [DisciplinaEnum.MA]: () => { this.consultarMa(); },
  };
  listaTipos: TipoConteudoEnum[];
  listaDisciplinaEnum$: Observable<DisciplinaModel[]>;

  tipoMensagem = TipoConteudoEnumMensagem;
  tipoIcone = TipoConteudoEnumIcone;

  observables = {
    [DisciplinaEnum.PT]: null,
    [DisciplinaEnum.CI]: null,
    [DisciplinaEnum.HI]: null,
    [DisciplinaEnum.MA]: null,
  };

  constructor(
    private bsModal: BsModalRef,
    private conteudoService: ConteudoService,
    private toast: ToastrService,
    private disService: DisciplinaService
  ) { }

  ngOnInit() {
    this.consultarConteudos();
    this.listaTipos = Object.values(TipoConteudoEnum);
    this.listaDisciplinaEnum$ = this.disService.listarDisciplinas();
  }

  consultarConteudos() {
    this.consultarPt();
    this.consultarCi();
    this.consultarMa();
    this.consultarHi();
  }

  consultarHi() {
    this.observables[DisciplinaEnum.HI] = this.conteudoService.conteudoByTurmaAndDiscipinas(this.turma.id, DisciplinaEnum.HI);
  }
  consultarMa() {
    this.observables[DisciplinaEnum.MA] = this.conteudoService.conteudoByTurmaAndDiscipinas(this.turma.id, DisciplinaEnum.MA);
  }
  consultarCi() {
    this.observables[DisciplinaEnum.CI] = this.conteudoService.conteudoByTurmaAndDiscipinas(this.turma.id, DisciplinaEnum.CI);
  }
  consultarPt() {
    this.observables[DisciplinaEnum.PT] = this.conteudoService.conteudoByTurmaAndDiscipinas(this.turma.id, DisciplinaEnum.PT);
  }

  addConteudo(titulo: string, conteudo: string, tipo: TipoConteudoEnum, disciplinaId: DisciplinaEnum, categoria: string) {

    const cont: ConteudoModel = {
      conteudo,
      titulo,
      tipo,
      disciplinaId,
      categoria,
      turmaId: this.turma.id
    };
    try {
      this.validarConteudo(cont);

      this.conteudoService.addConteudo(cont).subscribe(() => {
        this.funcoes[disciplinaId]();
      });
    } catch (error) {
      this.toast.error(error.message);
    }
  }


  validarConteudo(cont: ConteudoModel) {
    if (!cont.titulo) {
      throw new Error('Título deve ser informado');
    }
    if (!cont.conteudo) {
      throw new Error('Conteúdo deve ser informado');
    }
    if (!cont.tipo) {
      throw new Error('Tipo do conteúdo deve ser informado');
    }
  }

  fechar() {
    this.bsModal.hide();
  }

  removerCon(cont: ConteudoModel) {
    this.conteudoService.removerConteudo(cont.id).subscribe(() => {
      this.toast.success('Conteúdo removido com sucesso');
      this.funcoes[cont.disciplinaId]();
    });
  }
}
