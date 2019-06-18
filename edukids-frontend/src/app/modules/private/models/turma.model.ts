
export interface TurmaModel {
    id?: number;
    nome: string;
    professorId?: number;
    alunos: number[];
    dataInicio: number;
    dataFim: number;
}
