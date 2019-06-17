var TIPOS = {
    PROFESSOR: 'PROFESSOR',
    INSTRUTOR: 'INSTRUTOR',
    ALUNO: 'ALUNO',
    ADMIN: 'ADMIN'
}

function getDb() {
    return {
        usuarios: getUsuarios(),
        turmas: getTurmas()
    }
}

function getUsuarios() {
    return [
        {
            "id": 0,
            "email": "admin@email.com",
            "senha": "admin123",
            "nome": "Adminstrador",
            "tipo": "ADMIN"
        },
        {
            "email": "professor@teste.com",
            "nome": "Professor Teste",
            "instituicao": "UEPB",
            "senha": "123",
            "tipo": "PROFESSOR",
            "id": 1
        },
        {
            "email": "aluno@teste.com",
            "nome": "Aluno 1",
            "senha": "123",
            "tipo": "ALUNO",
            "id": 2
        },
        {
            "email": "aluno2@email.com",
            "nome": "Aluno 2",
            "senha": "123",
            "tipo": "ALUNO",
            "id": 3
        }
    ]
}

function getTurmas() {
    return [
        {
            "nome": "Turma Teste",
            "professorId": "1",
            "alunos": [],
            "id": 1,
            dataInicio:0,
            dataFim:0
        }
    ]
}

module.exports = getDb;