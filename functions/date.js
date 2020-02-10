module.exports = {
  
  age: function(timestamp){

    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    const day = today.getDate() - birthDate.getDay()

    if(month < 0 || month == 0 && day < 0) {
      age -=1
    }
    
    return age
  },
  date: function(timestamp){
    const date = new Date(timestamp)

    day = `0${date.getUTCDate()}`
    month = `0${date.getUTCMonth()+1}`
    year = `${date.getUTCFullYear()}`

    return (`${year}-${month.slice(-2)}-${day.slice(-2)}`)
  }
}
