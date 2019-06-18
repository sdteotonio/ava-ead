import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FabricaModalService } from 'src/app/core/services/fabrica-modal.service';
import { AlunoModel } from '../../models/aluno.model';

@Component({
  selector: 'app-area-aluno',
  templateUrl: './area-aluno.component.html',
  styleUrls: ['./area-aluno.component.css']
})
export class AreaAlunoComponent implements OnInit {
  idTurma: number;

  constructor(
    private modalSer: FabricaModalService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.solicitarTurma();
  }

  solicitarTurma() {
    console.log('Teste');
    
    this.modalSer.modalSelecionarTurma(this.auth.getUsuarioLogado<AlunoModel>().id).subscribe(idTurma => {
      this.idTurma = idTurma;
      // TODO: Apontar para os conteúdos
      console.log(`Turma ${idTurma} selecionada`);
    });
  }

}
