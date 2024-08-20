const config = require("../../config");
const { MongoClient } = require("mongodb");
const booksData = require("./data/test/books");
const usersData = require("./data/test/users");
const genresData = require("./data/test/genres");
const messagesData = require("./data/test/messages");
const swapCollectionsData = require("./data/test/swapCollections");

const client = new MongoClient(config.mongo.uri);

const validateArray = (data, name) => {
  if (!Array.isArray(data)) {
    throw new Error(`${name} must be an array`);
  }
  return data;
};

const seedCollection = async (collection, data, name) => {
  const validData = validateArray(data, name);
  if (validData.length === 0) {
    console.log(`No documents to insert into the ${name} collection.`);
    return;
  }

  console.log(`Deleting all documents in the ${name} collection...`);
  await collection.deleteMany({});
  console.log(`Inserting documents into the ${name} collection...`);
  const result = await collection.insertMany(validData);
  console.log(
    `Inserted ${result.insertedCount} documents into the ${name} collection`
  );
};

const seedMongoDB = async ({
  books = [],
  users = [],
  genres = [],
  messages = [],
  swapCollections = [],
}) => {
  try {
    console.log(`Connecting to ${config.mongo.uri}...`);
    await client.connect(); // Ensure the client is connected

    const db = client.db(config.mongo.dbName);

    // Seed each collection
    await seedCollection(db.collection("books"), books, "Books");
    await seedCollection(db.collection("users"), users, "Users");
    await seedCollection(db.collection("genres"), genres, "Genres");
    await seedCollection(db.collection("messages"), messages, "Messages");
    await seedCollection(
      db.collection("swapcollections"),
      swapCollections,
      "SwapCollections"
    );

    console.log("Database seeding complete.");
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
