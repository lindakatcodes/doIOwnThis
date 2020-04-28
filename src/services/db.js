/* eslint-disable no-unused-vars */
import Dexie from 'dexie'

const db = new Dexie('myItems')

db.version(1).stores({
  nailpolish: '++id, name, brand, colorgroup'
})

async function test() {
  const id = await db.nailpolish.put({
    name: 'royal red',
    brand: 'Sally Hanson',
    colorgroup: 'red',
    subbrand: 'InstaDri',
    img: ''
  })
  console.log('ID placed! ' + id)
}

test().catch(err => console.error('Problem: ' + err))

export default db
