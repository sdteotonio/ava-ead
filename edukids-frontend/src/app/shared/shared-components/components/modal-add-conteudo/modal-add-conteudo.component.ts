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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-conteudo',
  templateUrl: './modal-add-conteudo.component.html',
  styleUrls: ['./modal-add-conteudo.component.css']
})
export class ModalAddConteudoComponent implements OnInit {
  turma: TurmaModel;
  DisciplinaEnum = DisciplinaEnum;
  DisciplinaEnumIcone = DisciplinaEnumIcone;
  formCadastro: FormGroup;
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
  contSelecionado: ConteudoModel;

  constructor(
    private bsModal: BsModalRef,
    private conteudoService: ConteudoService,
    private toast: ToastrService,
    private disService: DisciplinaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.consultarConteudos();
    this.listaTipos = Object.values(TipoConteudoEnum);
    this.listaDisciplinaEnum$ = this.disService.listarDisciplinas();
    this.criarForm();
  }
  criarForm() {
    this.formCadastro = this.formBuilder.group({
      conteudo: [null, [Validators.required]],
      titulo: [null, [Validators.required]],
      tipo: [TipoConteudoEnum.ARQUIVO, [Validators.required]],
      disciplinaId: [DisciplinaEnum.PT, [Validators.required]],
      categoria: [null, [Validators.required]]
    });
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

  addConteudo(disciplinaId: DisciplinaEnum) {

    const cont: ConteudoModel = this.formCadastro.getRawValue();
    cont.turmaId = this.turma.id;
    try {
      this.validarConteudo(cont);
      this.conteudoService.addConteudo(cont).subscribe(() => {
        this.funcoes[disciplinaId]();
        this.formCadastro.reset();
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

  solicitarEditar(cont: ConteudoModel) {
    this.contSelecionado = cont;
    this.formCadastro.patchValue(cont);
  }

  editar() {
    const cont: ConteudoModel = this.formCadastro.getRawValue();
    cont.turmaId = this.turma.id;
    cont.id = this.contSelecionado.id;
    this.conteudoService.atualizarConteudo(cont).subscribe(() => {
      this.toast.success('Conteudo atualizado');
      this.formCadastro.reset();
      this.contSelecionado = null;
      this.funcoes[cont.disciplinaId]();
    });
  }

  cancelar() {
    this.contSelecionado = null;
    this.formCadastro.reset();
  }
}
