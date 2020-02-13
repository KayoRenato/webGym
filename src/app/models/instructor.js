const { date } = require('../lib/date')
const { removeSpace } = require('../lib/removeSpace')
const db = require('../../config/db')

module.exports = {
  all(callback){
    db.query(
    `
    SELECT * FROM instructors
    `
    , (err, results)=>{
      if(err) return res.send("Database Error!")

      callback(results.rows)
    })
  },
  save(data, callback){
    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        birth,
        create_at,
        services
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      date(data.birth).iso,
      date(Date.now()).iso,
      removeSpace(data.services) 
    ]

    db.query(query, values, (err, results) =>{
      if(err) return res.send("Database Error!")

      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(
      `
        SELECT * FROM instructors WHERE id = $1
      `
      , [id]
      , function(err, results){
          if(err) return res.send("Database Error!")
          callback(results.rows[0])
        }
    )
  },
  update(data, callback){
    const query =
    `
      UPDATE instructors SET
        avatar_url = ($1),
        name = ($2),
        birth = ($3),
        gender = ($4),
        services = ($5)
      WHERE id = $6
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      removeSpace(data.services),
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err) return res.send("Database Error!")

      callback()
    })

  }
}