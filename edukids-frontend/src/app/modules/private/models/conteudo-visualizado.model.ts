import { ConteudoModel } from 'src/app/shared/shared-models/interface/conteudo.model';

export interface ConteudoVisualizadoModel {
    percentual: number;
    conteudos?: {
        categoria: string,
        conteudos: ConteudoModel[]
    }[];
}
