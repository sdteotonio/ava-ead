import { AlunoModel } from './aluno.model';

export interface TurmaModel {
    nome: string;
    professorId?: number;
    alunos: AlunoModel[];
}
