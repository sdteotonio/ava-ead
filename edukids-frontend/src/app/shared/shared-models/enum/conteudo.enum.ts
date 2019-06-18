export enum TipoConteudoEnum {
    VIDEO = 'VIDEO',
    ARQUIVO = 'ARQUIVO',
    PAGINA_WEB = 'PAGINA_WEB'
}

export const TipoConteudoEnumMensagem = {
    [TipoConteudoEnum.VIDEO]: 'Vídeo',
    [TipoConteudoEnum.ARQUIVO]: 'Arquivo',
    [TipoConteudoEnum.PAGINA_WEB]: 'Página da Web'
};

export const TipoConteudoEnumIcone = {
    [TipoConteudoEnum.VIDEO]: 'fas fa-video',
    [TipoConteudoEnum.ARQUIVO]: 'fas fa-file-alt',
    [TipoConteudoEnum.PAGINA_WEB]: 'fas fa-link'
};
