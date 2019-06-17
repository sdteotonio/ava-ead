import { TipoUsuarioEnum } from '../enum/tipo-usuario.enum';

export interface UsuarioModel {
    id: number;
    email: string;
    senha: string;
    nome: string;
    tipo: TipoUsuarioEnum;
}
