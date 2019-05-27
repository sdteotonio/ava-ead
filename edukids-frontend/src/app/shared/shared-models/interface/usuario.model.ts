import { TipoUsuarioEnum } from '../enum/tipo-usuario.enum';

export interface UsuarioModel {
    email: string;
    nome: string;
    tipo: TipoUsuarioEnum;
}
