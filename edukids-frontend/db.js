var TIPOS = {
    PROFESSOR: 'PROFESSOR',
    INSTRUTOR: 'INSTRUTOR',
    ALUNO: 'ALUNO',
    ADMIN: 'ADMIN'
}

function getDb() {
    return {
        usuarios: getUsuarios(),
        turmas: getTurmas(),
        disciplinas: getDisciplinas(),
        conteudos: getConteudos()
    }
}

function getUsuarios() {
    return [
        {
            "id": 1,
            "email": "admin@email.com",
            "senha": "123",
            "nome": "Adminstrador Teste",
            "tipo": "ADMIN"
        },
        {
            "email": "professor@teste.com",
            "nome": "Professor Teste",
            "instituicao": "UEPB",
            "senha": "123",
            "tipo": "PROFESSOR",
            "id": 2
        },
        {
            "email": "aluno@teste.com",
            "nome": "Aluno Teste",
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
            "professorId": 2,
            "alunos": [3],
            "id": 1,
            dataInicio: 1559438638000,
            dataFim: 1564536238000
        }
    ]
}

function getDisciplinas() {
    return [
        {
            id: 'PT',
            nome: 'Português'
        },
        {
            id: 'CI',
            nome: 'Ciências'
        },
        {
            id: 'MA',
            nome: 'Matemática'
        },
        {
            id: 'HI',
            nome: 'História'
        }
    ]
}

function getConteudos() {
    return [
        {
            id: 0,
            turmaId: 0,
            titulo: '',
            disciplinaId: '',
            conteudo: '',
            tipo: ''
        }
    ]
}

module.exports = getDb;