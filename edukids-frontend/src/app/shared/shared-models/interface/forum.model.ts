export interface ForumModel {
    id?: number;
    turmaId: number;
    mensagens: {
        pessoa: string,
        texto: string
    }[];
}
