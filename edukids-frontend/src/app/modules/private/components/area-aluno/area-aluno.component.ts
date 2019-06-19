import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConteudoService } from 'src/app/core/services/conteudo.service';
import { FabricaModalService } from 'src/app/core/services/fabrica-modal.service';
import { TipoConteudoEnum } from 'src/app/shared/shared-models/enum/conteudo.enum';
import { DisciplinaEnum } from 'src/app/shared/shared-models/enum/disciplina.enum';
import { ConteudoModel } from 'src/app/shared/shared-models/interface/conteudo.model';
import { AlunoModel } from '../../models/aluno.model';
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
  conteudosPt: ConteudoVisualizadoModel;
  conteudosHi: ConteudoVisualizadoModel;
  conteudosMa: ConteudoVisualizadoModel;
  conteudosCi: ConteudoVisualizadoModel;

  constructor(
    private modalSer: FabricaModalService,
    private auth: AuthService,
    private router: Router,
    private conteudosServices: ConteudoService,
    private conteudoVisualizadoService: ConteudoVisualizadoService
  ) { }

  ngOnInit() {
    this.idTurma = Number(sessionStorage.getItem('ID_TURMA'));
    if (!this.idTurma) {
      this.solicitarTurma();
    } else {
      this.consultarConteudos();
    }
  }
  consultarConteudos() {
    this.conteudoVisualizadoService.getConteudoVisualizadoByAlunoAndTurma(this.idTurma, this.auth.getUsuarioLogado<AlunoModel>().id)
      .subscribe(listaConteudoVisualizado => {
        this.conteudosServices.conteudoByTurmaAndDiscipinas(this.idTurma, DisciplinaEnum.PT).subscribe(lista => {
          this.conteudosPt = {
            percentual: ((listaConteudoVisualizado.length / lista.length) * 100) || 0,
            conteudos: this.recuperarCategorias(lista).map(cat => {
              return {
                categoria: cat,
                conteudos: lista.filter(itemCont => itemCont.categoria === cat)
              };
            })
          };
          console.log(this.conteudosPt);

        });
      });
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

}
