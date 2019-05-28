import { TipoUsuarioEnum } from '../enum/tipo-usuario.enum';

export interface UsuarioModel {
    email: string;
    senha: string;
    senhaConfirm?: string;
    nome: string;
    tipo: TipoUsuarioEnum;
}
