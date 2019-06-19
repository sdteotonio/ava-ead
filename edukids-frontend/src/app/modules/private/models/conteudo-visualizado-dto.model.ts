import { DisciplinaEnum } from 'src/app/shared/shared-models/enum/disciplina.enum';

export interface ConteudoVisualizadoDtomodel {
    id?: number;
    idAluno: number;
    idTurma: number;
    idDisc: DisciplinaEnum;
    idConteudo: number;
}
