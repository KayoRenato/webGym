const fs = require('fs')
const Intl = require('Intl')
const data = require("../data/dataCreate.json")
const { age, date } = require('../functions/date')
const { removeSpace } = require('../functions/removeSpace')


// REDIRECT(GET) - 
exports.redirect = (req, res) => {
  return res.redirect("/instructors")
}
// CREATE (POST) - 
exports.create = (req, res) => {
  return res.render("instructors/create")
}
// TABLE(GET) - Mostrar dados dos instrutores cadastrados
exports.table = (req, res) => {
  return res.render("instructors/index", {instructors: data.instructors})
}
// SHOW(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params)
exports.show = (req,res) => {
  const { id } = req.params

  const foundInstructor = data.instructors.find((instructor) => instructor.id == id)

  if(!foundInstructor) return res.send("Instructor not Found!")
  
  const instructor = {
    ...foundInstructor,
    birth: age(foundInstructor.birth),
    gender: (foundInstructor.gender == 'M'? "Masculino":"Feminino"),
    createdAt: new Intl.DateTimeFormat('pt-BR',{day: 'numeric', month: 'long', year: 'numeric'}).format(foundInstructor.createdAt)
  }


  return res.render("instructors/show", { instructor })
}
// SAVE(POST) - Salvar um novo dado do req.body, vindos do form da rota routes.get('/instructors/create', callback - render page create), no arquivo dataCreate.JS
exports.save = (req, res) => {

  let { avatarURL, name, birth, gender, services } = req.body

  birth = Date.parse(birth)
  const id = Number(data.instructors.length+1)
  const createdAt = Date.now()
  services = removeSpace(services)
  
  data.instructors.push({ 
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

      return res.redirect("/instructors")
    }
  )

}
// EDIT(GET) - Mostrar dados com referência no parametros informardo no parametro http (req.params) em uma pagina editável
exports.edit = (req, res) => {

  const { id } = req.params

  const foundInstructor = data.instructors.find((instructor) => instructor.id == id)
  
  if(!foundInstructor) return res.send("Instructor not Found!")
  
  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  }
 
  return res.render("instructors/edit", { instructor })
}
// UPDATE(PUT) - Atualizar os dados 
exports.update = (req,res) => {
  let { id, birth, services } = req.body

  console.log(req.body)
  console.log(typeof birth)
  let index = 0

  const foundInstructor = data.instructors.find((instructor,foundIndex) => {
    if(id == instructor.id){
      index = foundIndex
      return true
    }

  })

  
  birth = Date.parse(birth) //transforma no formato timestamp
  services = removeSpace(services)
  
  console.log(typeof birth, birth)

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth,
    services,
    id: Number(req.body.id)

   }

   console.log(instructor)

  //  diferença entre PUT AND POST - ATUALIZAÇÃO DE DADOS
   data.instructors[index] = instructor

   fs.writeFile(
    "./data/dataCreate.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect(`/instructors/${id}`)
    }
  )
}
// DELETE(DELETE) - Apagar o dado informado
exports.delete = (req, res) => {
  const { id } = req.body

  const filteredInstructors = data.instructors.filter(item => {
    return item.id != id
  })
  
  data.instructors = filteredInstructors

  let contId = 1
  data.instructors.map(item => {
    item.id = contId
    contId++
    return item

  })

  fs.writeFile(
    "./data/dataCreate.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect(`/instructors`)
    }
  )
} 


