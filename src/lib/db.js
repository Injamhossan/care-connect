import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
} else {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase() {
  if (!clientPromise) {
     throw new Error("Database connection not initialized. Check MONGODB_URI.");
  }
  const client = await clientPromise;
  return client.db('care_connect');
}

export default clientPromise;
