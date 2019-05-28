import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';

export interface ProfessorModel extends UsuarioModel {
    instituicao: string;
}
