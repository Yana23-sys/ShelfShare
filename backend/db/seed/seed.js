const { MongoClient } = require("mongodb");
const config = require("../../config");

// Initialize MongoDB client
const client = new MongoClient(config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedMongoDB = async (data) => {
  try {
    console.log(`Connecting to ${config.mongo.uri}...`);
    await client.connect();
    const db = client.db(config.mongo.dbName);

    // Define collections
    const booksCollection = db.collection("books");
    const genresCollection = db.collection("genres");
    const messagesCollection = db.collection("messages");
    const swapsCollection = db.collection("swaps");
    const usersCollection = db.collection("users");

    // Clear existing data
    console.log("Deleting all documents in the collections...");
    await Promise.all([
      booksCollection.deleteMany({}),
      genresCollection.deleteMany({}),
      messagesCollection.deleteMany({}),
      swapsCollection.deleteMany({}),
      usersCollection.deleteMany({}),
    ]);

    // Insert new data
    console.log("Inserting documents into the collections...");
    await Promise.all([
      booksCollection.insertMany(data.books),
      genresCollection.insertMany(data.genres),
      messagesCollection.insertMany(data.messages),
      swapsCollection.insertMany(data.swaps),
      usersCollection.insertMany(data.users),
    ]);

    console.log("Database seeded!");
  } catch (err) {
    console.error("Error occurred while seeding the database:", err);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
};

module.exports = { seedMongoDB };
