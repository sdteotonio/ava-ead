import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { TurmaModel } from 'src/app/modules/private/models/turma.model';
import { ModalAddAlunoTurmaComponent } from 'src/app/shared/shared-components/components/modal-add-aluno-turma/modal-add-aluno-turma.component';
import { ModalAddConteudoComponent } from 'src/app/shared/shared-components/components/modal-add-conteudo/modal-add-conteudo.component';
import { ModalDialogComponent } from 'src/app/shared/shared-components/components/modal-dialog/modal-dialog.component';
import { ModalSelecionarTurmaComponent } from 'src/app/shared/shared-components/components/modal-selecionar-turma/modal-selecionar-turma.component';
import { ModalVideoComponent } from 'src/app/shared/shared-components/components/modal-video/modal-video.component';

@Injectable()
export class FabricaModalService {

  constructor(
    private bsModalS: BsModalService
  ) { }

  modalConfirm(pergunta: string): Observable<boolean> {
    return this.bsModalS.show(ModalDialogComponent, {
      class: 'modal-dialog-centered',
      initialState: {
        pergunta,
        titulo: 'Remover'
      }
    }).content.confirm$;
  }

  modalAddAlunoTurma(turmaModel: TurmaModel): Observable<any> {
    return this.bsModalS.show(ModalAddAlunoTurmaComponent, {
      class: 'modal-lg',
      initialState: {
        turma: turmaModel
      }
    }).content.close$;
  }

  modalAddConteudoTurma(turmaModel: TurmaModel) {
    return this.bsModalS.show(ModalAddConteudoComponent, {
      class: ' modal-lg',
      ignoreBackdropClick: true,
      initialState: {
        turma: turmaModel
      }
    });
  }

  modalSelecionarTurma(alunoId: number): Observable<number> {
    return this.bsModalS.show(ModalSelecionarTurmaComponent, {
      class: 'modal-lg',
      ignoreBackdropClick: true,
      initialState: {
        alunoId
      }
    }).content.turmaEvt$;
  }

  modalVideo(titulo: string, iFrame: any) {
    return this.bsModalS.show(ModalVideoComponent, {
      class: 'modal-lg',
      ignoreBackdropClick: true,
      initialState: {
        titulo,
        iFrame
      }
    });
  }
}
