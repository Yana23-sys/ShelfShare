const config = require("../../config");
const { MongoClient } = require("mongodb");

const client = new MongoClient(config.mongo.uri);

const seedMongoDB = async ({
  books,
  users,
  genres,
  messages,
  swapCollections,
}) => {
  try {
    console.log(`Connecting to ${config.mongo.uri}...`);
    await client.connect();
    const db = client.db(config.mongo.dbName);

    // Seed books
    const collection = db.collection("books");
    console.log("Deleting all documents in the books collection...");
    await collection.deleteMany({});
    console.log("Inserting documents into the books collection...");
    const result = await collection.insertMany(books);
    console.log(
      `Inserted ${result.insertedCount} documents into the books collection`
    );

    // Seed users
    const usersCollection = db.collection("users");
    console.log("Deleting all documents in the users collection...");
    await usersCollection.deleteMany({});
    console.log("Inserting documents into the users collection...");
    await usersCollection.insertMany(users);
    console.log(`Inserted ${users.length} documents into the users collection`);

    // Seed genres
    const genresCollection = db.collection("genres");
    console.log("Deleting all documents in the genres collection...");
    await genresCollection.deleteMany({});
    console.log("Inserting documents into the genres collection...");
    await genresCollection.insertMany(genres);
    console.log(
      `Inserted ${genres.length} documents into the genres collection`
    );

    // Seed messages
    const messagesCollection = db.collection("messages");
    console.log("Deleting all documents in the messages collection...");
    await messagesCollection.deleteMany({});
    console.log("Inserting documents into the messages collection...");
    await messagesCollection.insertMany(messages);
    console.log(
      `Inserted ${messages.length} documents into the messages collection`
    );

    // Seed swapCollections
    const swapCollections = db.collection("swapcollections");
    console.log("Deleting all documents in the swapCollections ...");
    await swapCollections.deleteMany({});
    console.log("Inserting documents into the swapCollections...");
    await swapCollections.insertMany(messages);
    console.log(
      `Inserted ${messages.length} documents into the swapCollections`
    );

    console.log("Database seeding complete.");
  } catch (err) {
    console.error("Error during database seeding:", err);
  } finally {
    await client.close();
  }
};

module.exports = { seedMongoDB };
