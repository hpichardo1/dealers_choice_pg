const express = require('express')
const app = express()
const client = require('./db')


app.get('/', async(req, res, next)=> {
  const data = await client.People.findAll()

  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style> 
      h1 {
        color: dodgerblue;
        font-size: 50px
      }
      </style>
    </head>
    <body>
    <h1>People</h1>
    
    <ul>
    ${data.map((obj) => {return `<li><a href = /${obj.id} >${obj.name} </a> </li>`}).join('')}
    </ul>
      
    </body>
    </html>`
  )
});

app.get('/:id', async(req, res, next) =>{
 
  const user = await client.People.findByPk(req.params.id*1)
 
  res.send(
      `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style> 
      h1 {
        color: dodgerblue;
        font-size: 34px
      }
      </style>
    </head>
    <body>
    
    <ul>
    <h1> <a href = />${user.dataValues.name}</a></h1>
    <li>  ${user.dataValues.league} </li>
    <li>  ${user.dataValues.position} </li>
    </ul>
      
    </body>
    </html>`)
  } 
)


const  PORT  = 3000

app.listen(PORT, async ()=> {
  await client.syncAndSeed() 
  console.log(`Listening on port ${PORT}`)
});