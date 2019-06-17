import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { TurmaModel } from 'src/app/modules/private/models/turma.model';
import { ModalAddAlunoTurmaComponent } from 'src/app/shared/shared-components/components/modal-add-aluno-turma/modal-add-aluno-turma.component';
import { ModalDialogComponent } from 'src/app/shared/shared-components/components/modal-dialog/modal-dialog.component';

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
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        turma: turmaModel
      }
    }).content.close$;
  }
}
