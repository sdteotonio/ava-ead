import { AlunoModel } from './aluno.model';

export interface TurmaModel {
    id?: number;
    nome: string;
    professorId?: number;
    alunos: AlunoModel[];
    dataInicio: number;
    dataFim: number;
}
