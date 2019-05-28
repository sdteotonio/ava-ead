const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true },
    tipoUser: {type: String, required:false, uppercase: true, enum:['ADMIN','PROFESSOR','ALUNO']}
})

module.exports = restful.model('User', userSchema)