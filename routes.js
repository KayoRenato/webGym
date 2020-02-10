const express = require('express')
const routes = express.Router()
const instructors = require("./instructors")


routes.get('/', (req, res) => {
  return res.redirect("/instructors")
})


routes.get('/instructors/create', (req, res) => {
  return res.render("instructors/create")
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.get('/instructors', instructors.table)

routes.post('/instructors', instructors.save)

routes.put('/instructors', instructors.update)

routes.delete('/instructors', instructors.delete)

// routes.get('/members', (req, res) => {
//   return res.send("members")
// })


module.exports = routes
