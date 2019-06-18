import { TipoConteudoEnum } from '../enum/conteudo.enum';
import { DisciplinaEnum } from '../enum/disciplina.enum';

export interface ConteudoModel {
    id?: number;
    turmaId: number;
    titulo: string;
    disciplinaId: DisciplinaEnum;
    conteudo: string;
    tipo: TipoConteudoEnum;
}
