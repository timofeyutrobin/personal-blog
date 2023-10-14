import { DATABASE_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(DATABASE_URL);

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
};

export const disconnectFromDatabase = async () => {
    client.close();
};

export const db = client.db();
