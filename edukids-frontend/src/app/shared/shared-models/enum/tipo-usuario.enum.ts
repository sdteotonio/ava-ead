export enum TipoUsuarioEnum {
    PROFESSOR = 'PROFESSOR',
    INSTRUTOR = 'INSTRUTOR',
    ALUNO = 'ALUNO',
    ADMIN = 'ADMIN'
}

export const TipoUsuarioEnumMensagem = {
    [TipoUsuarioEnum.ADMIN]: 'Administrador',
    [TipoUsuarioEnum.ALUNO]: 'Aluno',
    [TipoUsuarioEnum.PROFESSOR]: 'Professor',
    [TipoUsuarioEnum.INSTRUTOR]: 'Instrutor',
};
