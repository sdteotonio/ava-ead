import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { ForumModel } from 'src/app/shared/shared-models/interface/forum.model';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';

@Component({
  selector: 'app-modal-forum',
  templateUrl: './modal-forum.component.html',
  styleUrls: ['./modal-forum.component.css']
})
export class ModalForumComponent implements OnInit {
  idTurma: number;
  inputMsg: FormControl;

  forumAtual: ForumModel;

  constructor(
    private bsModalRef: BsModalRef,
    private forumService: ForumService,
    private auth: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.inputMsg = new FormControl();
    this.recuperarForum();
  }

  fechar() {
    this.bsModalRef.hide();
  }

  enviar() {
    if (!this.forumAtual) {
      this.forumAtual = {
        mensagens: [],
        turmaId: this.idTurma
      };
    } else {
      if (!this.forumAtual.mensagens) {
        this.forumAtual.mensagens = [];
      } else {
        this.forumAtual.mensagens.push({
          pessoa: this.auth.getUsuarioLogado<UsuarioModel>().nome,
          texto: this.inputMsg.value
        });
      }
    }
    this.forumService.atualizarForum(this.forumAtual).subscribe(() => {
      this.toast.success('Mensagem enviada.');
      this.recuperarForum();
    });
  }

  recuperarForum() {
    this.forumService.getForumByTurma(this.idTurma).subscribe(forum => {
      this.forumAtual = forum;
    });
  }

}
