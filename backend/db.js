import mongoose from 'mongoose';

// function for connecting to mongodb instance
const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

// function for disconnecting from mongodb instance
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB disconnected!');
    } catch (error) {
        console.error('Error disconnecting from MongoDB', error);
        process.exit(0);
    }
}

export default { connectDB, disconnectDB }