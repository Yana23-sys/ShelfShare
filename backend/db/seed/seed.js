const config = require('../../config')
const { MongoClient } = require('mongodb')

const client = new MongoClient(config.mongo.uri)

const seedCollection = async (db, data, name) => {
  const collection = db.collection(name)
  await collection.deleteMany({});
  if (data.length === 0) {
    return []
  }
  const result = await collection.insertMany(data);
  return await collection.find().toArray()
}

const seedMongoDB = async ({books, users, genres, messages}) => {
  try {
    await client.connect()
    let db = client.db(config.mongo.dbName)
    
    // Drop the database
    const dropResult = await db.dropDatabase()
    db = client.db(config.mongo.dbName)

    // Seed users
    const newUsers = await seedCollection(db, users, 'users')

    // Seed genres
    const newGenres = await seedCollection(db, genres, 'genres')

    // Seed books
    const genresByName = new Map(newGenres.map(genre => [genre.name, genre]))
    const usersByUsername = new Map(newUsers.map(user => [user.username, user]))
    const booksToInsert = books.map(book => {
      const genreId = genresByName.get(book.genre)._id
      const userId = usersByUsername.get(book.user)._id
      return { ...book, genre: genreId, user: userId }
    })
    const newBooks = await seedCollection(db, booksToInsert, 'books')
 
    // Seed messages
    const newMessages = await seedCollection(db, messages, 'messages')

    // console.log('Database seeding complete.')

    return {users: newUsers, genres: newGenres, books: newBooks, messages: newMessages}
  } catch (err) {
    console.error("Error during database seeding:", err);
  } finally {
    await client.close();
  }
};

module.exports = { seedMongoDB };
