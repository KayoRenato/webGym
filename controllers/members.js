const fs = require('fs')
const data = require("../data/dataCreate.json")
const { age, date } = require('../functions/date')
const { removeSpace } = require('../functions/removeSpace')
const Intl = require('Intl')


// REDIRECT(GET) - 
exports.redirect = (req, res) => {
  return res.redirect("/members")
}
// CREATE (POST) - 
exports.create = (req, res) => {
  return res.render("members/create")
}
// TABLE(GET) - Mostrar dados dos instrutores cadastrados
exports.table = (req, res) => {
  return res.render("members/index", {members: data.members})
}
// SHOW(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params)
exports.show = (req,res) => {
  const { id } = req.params

  const foundMember = data.members.find((member) => member.id == id)

  if(!foundMember) return res.send("Member not Found!")
  
  const member = {
    ...foundMember,
    birth: age(foundMember.birth),
    gender: (foundMember.gender == 'M'? "Masculino":"Feminino"),
    createdAt: new Intl.DateTimeFormat('pt-BR',{day: 'numeric', month: 'long', year: 'numeric'}).format(foundMember.createdAt)
  }


  return res.render("members/show", { member })
}
// SAVE(POST) - Salvar um novo dado do req.body, vindos do form da rota routes.get('/members/create', callback - render page create), no arquivo dataCreate.JS
exports.save = (req, res) => {
  
  let { avatarURL, name, birth, gender, services } = req.body

  birth = Date.parse(birth)
  const id = Number(data.members.length+1)
  const createdAt = Date.now()
  services = removeSpace(services)
  
  data.members.push({ 
    id,
    avatarURL,
    name,
    birth,
    gender,
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
// EDIT(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params) em uma pagina editável
exports.edit = (req, res) => {

  const { id } = req.params

  const foundMember = data.members.find((member) => member.id == id)
  
  if(!foundMember) return res.send("Member not Found!")
  
  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  }
 
  return res.render("members/edit", { member })
}
// UPDATE(PUT) - Atualizar os dados 
exports.update = (req,res) => {
  let { id, birth, services } = req.body

  console.log(req.body)
  console.log(typeof birth)
  let index = 0

  const foundMember = data.members.find((member,foundIndex) => {
    if(id == member.id){
      index = foundIndex
      return true
    }

  })

  
  birth = Date.parse(birth) //transforma no formato timestamp
  services = removeSpace(services)
  
  console.log(typeof birth, birth)

  const member = {
    ...foundMember,
    ...req.body,
    birth,
    services,
    id: Number(req.body.id)

   }

   console.log(member)

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


