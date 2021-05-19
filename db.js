const Sequelize  = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/people');


//psql database is call 'people'

const data = [
  {
    name: 'Allen Iverson',
    league: 'NBA',
    position: 'Point Guard',
  }, 
  {
    name: 'Alex Rodriguez',
    league: 'MLB',
    position: 'Shortstop'
  },
  {
    name: 'Peyton Manning',
    league: 'NFL',
    position: 'Quarterback'
  }
]

const People = conn.define('people', {
  name: Sequelize.STRING,
  league: Sequelize.STRING,
  position: Sequelize.STRING
})

const syncAndSeed = async() => {
  try {
    await conn.sync({force: true})
    await Promise.all(data.map(obj => People.create(obj)))
  } 
  catch (ex) {

  }
}


module.exports = {
  People, 
  syncAndSeed,
}


//.findbyPk()