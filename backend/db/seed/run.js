const config = require('../../config')
const { MongoClient } = require('mongodb')

const client = new MongoClient(config.mongo.uri)

const seedMongoDB = async ({books}) => {
  try {
    console.log(`Connecting to ${config.mongo.uri}...`)
    await client.connect();
    const db = client.db(config.mongo.dbName)
    const collection = db.collection('books')

    console.log('Deleting all documents in the books collection...')
    await collection.deleteMany({})

    console.log('Inserting documents into the books collection...')
    const result = await collection.insertMany(books)
    console.log(`Inserted ${result.insertedCount} documents into the books collection`)
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
}

module.exports = { seedMongoDB }
