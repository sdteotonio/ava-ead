import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';

export interface AlunoModel extends UsuarioModel {
    idProfessor?: number;
}
