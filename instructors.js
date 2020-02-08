const fs = require('fs')
const data = require("./data/dataCreateInstructors.json")
// create
exports.post = (req, res) => {
  
  // Validação de dados pós submit - Pessímo para UX
  //const keys =  Object.keys(req.body)
  // 
  // for(key of keys){
  //   if(req.body[key] == ''){
  //     return res.send(`Preencha todos os campos! ${key}`)
  //   }
  // }
  data.instructors.push(req.body)

  fs.writeFile(
    "./data/dataCreateInstructors.json",
     JSON.stringify(data,null, 2),
    (err) => {
      if(err) return res.send('White File Error!')

      return res.redirect("/instructors")
    }
  )

}


// update

// delete