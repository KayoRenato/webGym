const Intl = require('Intl')
const { age, date } = require('../lib/date')
const { removeSpace } = require('../lib/removeSpace')

module.exports = {
  // REDIRECT(GET) - 
  redirect(req, res) {
    return res.redirect("/instructors")
  },
  // TABLE(GET) - Mostrar dados dos instrutores cadastrados
  table(req, res) {
    return res.render("instructors/index")
  },
  // CREATE (POST) - Mostrar page de criação do Instrutor
  create(req, res) {
   return res.render("instructors/create")
  },
  // SAVE(POST) - Salvar um novo dado do req.body, vindos do form da rota routes.get('/instructors/create', callback - render page create), no arquivo dataCreate.JS
  save(req, res) {
    
    return
  },
  // SHOW(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params)
  show(req, res) {

    return
  },
  // EDIT(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params) em uma pagina editável
  edit(req, res) {

    return
  },
  // UPDATE(PUT) - Atualizar os dados 
  update(req, res) {
    
    return
  },
  // DELETE(DELETE) - Apagar o dado informado
  delete(req, res) {
   
    return
  },
}


