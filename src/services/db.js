/* eslint-disable no-unused-vars */
import Dexie from 'dexie'

const db = new Dexie('myItems')

db.version(1).stores({
  nailpolish: '++id, name, brand, colorgroup'
})

db.version(2).stores({
  nailpolish: null,
  collectionItems: '++id, name, brand, color-group, category'
})

async function test() {
  const id = await db.collectionItems.put({
    name: 'royal red',
    brand: 'Sally Hanson',
    'color-group': 'red',
    'sub-brand': 'InstaDri',
    img: '',
    category: 'nail-polish'
  })
  console.log('ID placed! ' + id)
}

test().catch(err => console.error('Problem: ' + err))

export default db
