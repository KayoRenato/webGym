const fs = require('fs')
const data = require("../data/dataCreate.json")
const { age, date } = require('../functions/date')
const { removeSpace } = require('../functions/removeSpace')
const Intl = require('Intl')



// TABLE(GET) - Mostrar dados dos membros cadastrados
exports.table = (req, res) => {
  return res.render("members/index", {members: data.members})
}
// CREATE (POST) - Mostrar page de criação de usuário
exports.create = (req, res) => {
  return res.render("members/create")
}
// SAVE(POST) - Salvar um novo dado do req.body, vindos do form da rota routes.get('/members/create', callback - render page create), no arquivo dataCreate.JS
exports.save = (req, res) => {
  
  let { avatarURL, name, birth, gender, services, blood, height, weight, email } = req.body

  birth = Date.parse(birth)
  const id = Number(data.members.length+1)
  const createdAt = Date.now()
  services = removeSpace(services)
  
  data.members.push({ 
    id,
    avatarURL,
    name,
    email,
    birth,
    gender,
    blood,
    height,
    weight,
    services,
    createdAt
  })

  fs.writeFile(
    "./data/dataCreate.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect("/members")
    }
  )

}
// SHOW(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params)
exports.show = (req,res) => {
  const { id } = req.params

  const foundMember = data.members.find((member) => member.id == id)

  if(!foundMember) return res.send("Member not Found!")
  
  const member = {
    ...foundMember,
    birth: age(foundMember.birth),
    gender: (foundMember.gender == 'M'? "Masculino":"Feminino"), //Se o usuário não preencher na hora do cadastro, ao solicitar a exibição do aluno, aparecerá "Feminino"
    birthDay: date(foundMember.birth).birthDay,
    createdAt: new Intl.DateTimeFormat('pt-BR',{day: 'numeric', month: 'long', year: 'numeric'}).format(foundMember.createdAt)
  }


  return res.render("members/show", { member })
}
// EDIT(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params) em uma pagina editável
exports.edit = (req, res) => {

  const { id } = req.params

  const foundMember = data.members.find((member) => member.id == id)
  
  if(!foundMember) return res.send("Member not Found!")
  
  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }
 
  return res.render("members/edit", { member })
}
// UPDATE(PUT) - Atualizar os dados 
exports.update = (req,res) => {
  let { id, birth, services } = req.body

  let index = 0

  const foundMember = data.members.find((member,foundIndex) => {
    if(id == member.id){
      index = foundIndex
      return true
    }

  })
  
  birth = Date.parse(birth) //transforma no formato timestamp
  services = removeSpace(services)
  
  const member = {
    ...foundMember,
    ...req.body,
    birth,
    services,
    id: Number(req.body.id)

   }

  //  diferença entre PUT AND POST - ATUALIZAÇÃO DE DADOS
   data.members[index] = member

   fs.writeFile(
    "./data/dataCreate.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect(`/members/${id}`)
    }
  )
}
// DELETE(DELETE) - Apagar o dado informado
exports.delete = (req, res) => {
  const { id } = req.body

  const filteredMembers = data.members.filter(item => {
    return item.id != id
  })
  
  data.members = filteredMembers

  let contId = 1
  data.members.map(item => {
    item.id = contId
    contId++
    return item

  })

  fs.writeFile(
    "./data/dataCreate.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect(`/members`)
    }
  )
} 


