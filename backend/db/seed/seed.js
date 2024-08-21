const config = require('../../config')
const { MongoClient } = require('mongodb')

const client = new MongoClient(config.mongo.uri)

const seedMongoDB = async ({books, users, genres, messages}) => {
  try {
    console.log(`Connecting to ${config.mongo.uri}...`)
    await client.connect();
    const db = client.db(config.mongo.dbName)
    
    // Seed users
    const usersCollection = db.collection('users')
    console.log('Deleting all documents in the users collection...')
    await usersCollection.deleteMany({})
    console.log('Inserting documents into the users collection...')
    await usersCollection.insertMany(users)
    const newUsers = await usersCollection.find().toArray()
    console.log(`Inserted ${users.length} documents into the users collection`)
    
    // Seed genres
    const genresCollection = db.collection('genres')
    console.log('Deleting all documents in the genres collection...')
    await genresCollection.deleteMany({})
    console.log('Inserting documents into the genres collection...')
    await genresCollection.insertMany(genres)
    const newGenres = await genresCollection.find().toArray()
    console.log(`Inserted ${genres.length} documents into the genres collection`)
    
    // Seed books
    const collection = db.collection('books')
    console.log('Deleting all documents in the books collection...')
    await collection.deleteMany({})
    console.log('Inserting documents into the books collection...')
    const genresByName = new Map(newGenres.map(genre => [genre.name, genre]))
    const usersByUsername = new Map(newUsers.map(user => [user.username, user]))
    const booksToInsert = books.map(book => {
      const genreId = genresByName.get(book.genre)._id
      const userId = usersByUsername.get(book.user)._id
      return { ...book, genre: genreId, user: userId }
    })
    const result = await collection.insertMany(booksToInsert)
    console.log(`Inserted ${result.insertedCount} documents into the books collection`)
 
    // Seed messages
    const messagesCollection = db.collection('messages')
    console.log('Deleting all documents in the messages collection...')
    await messagesCollection.deleteMany({})
    console.log('Inserting documents into the messages collection...')
    await messagesCollection.insertMany(messages)
    console.log(`Inserted ${messages.length} documents into the messages collection`)
    
    
    console.log('Database seeding complete.')
  } catch (err) {
    console.error("Error during database seeding:", err);
  } finally {
    await client.close();
  }
};

seedMongoDB({
  books: booksData,
  users: usersData,
  genres: genresData,
  messages: messagesData,
  swapCollections: swapCollectionsData,
});

module.exports = { seedMongoDB };
