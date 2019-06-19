import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConteudoService } from 'src/app/core/services/conteudo.service';
import { FabricaModalService } from 'src/app/core/services/fabrica-modal.service';
import { TipoConteudoEnum } from 'src/app/shared/shared-models/enum/conteudo.enum';
import { DisciplinaEnum } from 'src/app/shared/shared-models/enum/disciplina.enum';
import { ConteudoModel } from 'src/app/shared/shared-models/interface/conteudo.model';
import { AlunoModel } from '../../models/aluno.model';
import { ConteudoVisualizadoDtomodel } from '../../models/conteudo-visualizado-dto.model';
import { ConteudoVisualizadoModel } from '../../models/conteudo-visualizado.model';
import { ConteudoVisualizadoService } from '../../services/conteudo-aluno.service';

@Component({
  selector: 'app-area-aluno',
  templateUrl: './area-aluno.component.html',
  styleUrls: ['./area-aluno.component.css']
})
export class AreaAlunoComponent implements OnInit {
  idTurma: number;
  DisciplinaEnum = DisciplinaEnum;
  TipoConteudoEnum = TipoConteudoEnum;
  listas: Record<DisciplinaEnum, ConteudoVisualizadoModel> = {
    [DisciplinaEnum.PT]: null,
    [DisciplinaEnum.MA]: null,
    [DisciplinaEnum.CI]: null,
    [DisciplinaEnum.HI]: null,
  };
  listaConteudoVisualizado: ConteudoVisualizadoDtomodel[];
  listaDisciplinas: any[];

  constructor(
    private modalSer: FabricaModalService,
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private conteudosServices: ConteudoService,
    private conteudoVisualizadoService: ConteudoVisualizadoService,
    private modalFabrica: FabricaModalService,
    private embedService: EmbedVideoService
  ) { }

  ngOnInit() {
    this.idTurma = Number(sessionStorage.getItem('ID_TURMA'));
    if (!this.idTurma) {
      this.solicitarTurma();
    } else {
      this.consultarConteudos();
    }
  }
  consultarConteudos(atualizarTudo = true) {
    this.conteudoVisualizadoService.getConteudoVisualizadoByAlunoAndTurma(this.idTurma, this.auth.getUsuarioLogado<AlunoModel>().id)
      .subscribe(listaConteudoVisualizado => {
        this.listaConteudoVisualizado = listaConteudoVisualizado;
        this.listaDisciplinas = Object.values(DisciplinaEnum);
        this.listaDisciplinas.forEach(disciplina => {
          this.conteudosServices.conteudoByTurmaAndDiscipinas(this.idTurma, disciplina).subscribe(lista => {
            if (atualizarTudo) {
              this.listas[disciplina] = {
                percentual: Number(((this.getTamanhoByDisciplina(listaConteudoVisualizado, disciplina)
                  .length / lista.length) * 100).toPrecision(1)) || 0,
                conteudos: this.recuperarCategorias(lista).map(cat => {
                  return {
                    categoria: cat,
                    conteudos: lista.filter(itemCont => itemCont.categoria === cat)
                  };
                })
              };
            } else {
              if (this.listas[disciplina]) {
                this.listas[disciplina].percentual = Number(((this.getTamanhoByDisciplina(listaConteudoVisualizado, disciplina)
                  .length / lista.length) * 100).toPrecision(1)) || 0;
              }
            }
          });
        });
      });
  }

  getTamanhoByDisciplina(listaCoteudoVisu: ConteudoVisualizadoDtomodel[], dis: DisciplinaEnum) {
    if (listaCoteudoVisu) {
      const listaSaida = [];
      for (let index = 0; index < listaCoteudoVisu.length; index++) {
        const element = listaCoteudoVisu[index];
        if (element.idDisc === dis) {
          listaSaida.push(element);
        }
      }
      console.log(listaSaida);

      return listaSaida;
    }
    return [];
  }

  verificarSelecionado(conteu: ConteudoModel) {
    if (this.listaConteudoVisualizado) {
      return this.listaConteudoVisualizado.some(x => x.idConteudo === conteu.id);
    }
    return false;
  }

  recuperarCategorias(lista: ConteudoModel[]): string[] {
    const listasCategorias = [];
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      if (!listasCategorias.includes(element.categoria)) {
        listasCategorias.push(element.categoria);
      }
    }
    return listasCategorias;
  }

  solicitarTurma() {
    this.modalSer.modalSelecionarTurma(this.auth.getUsuarioLogado<AlunoModel>().id).subscribe(idTurma => {
      this.idTurma = idTurma;
      sessionStorage.setItem('ID_TURMA', String(this.idTurma));
      this.consultarConteudos();
    });
  }

  redirectConteudo(idDisclipla: DisciplinaEnum) {
    this.router.navigate([`area-curso/${this.idTurma}/${idDisclipla}`]);
  }

  abrirconteudo(conteudoModel: ConteudoModel) {
    if (conteudoModel.conteudo) {
      if (conteudoModel.conteudo.includes('http') && conteudoModel.tipo === TipoConteudoEnum.VIDEO) {
        if (conteudoModel.conteudo.includes('youtube')) {
          this.modalFabrica.modalVideo(conteudoModel.titulo,
            this.embedService.embed(conteudoModel.conteudo));
        } else {
          window.open(conteudoModel.conteudo, '_blank');
        }
      } else {
        window.open(conteudoModel.conteudo, '_blank');
      }
    } else {
      this.toastrService.error('Conteúdo não disponível');
    }

  }

  visu(evt, cont: ConteudoModel) {
    if (evt.target.checked) {
      this.conteudoVisualizadoService.addVisu({
        idAluno: this.auth.getUsuarioLogado<AlunoModel>().id,
        idConteudo: cont.id,
        idTurma: this.idTurma,
        idDisc: cont.disciplinaId
      }).subscribe(() => {
        this.toastrService.success('Conteúdo visualizado');
        this.consultarConteudos(false);
      });
    } else {
      this.conteudoVisualizadoService.remover(
        this.listaConteudoVisualizado.find(contAtual => {
          // tslint:disable-next-line: triple-equals
          return contAtual.idConteudo == cont.id;
        }).id
      ).subscribe(() => {
        this.toastrService.success('Conteúdo não visualizado');
        this.consultarConteudos(false);
      });
    }

  }
  forum() {
    this.modalFabrica.modalForum(this.idTurma);
  }

}
