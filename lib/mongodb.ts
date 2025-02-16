import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.error("❌ MONGODB_URI is missing!");
  throw new Error("Add MONGODB_URI to .env.local");
}

console.log("✅ Attempting to connect to MongoDB...");

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("🔄 Creating a new MongoClient in development mode...");
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("🔄 Creating a new MongoClient in production mode...");
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

clientPromise
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default clientPromise;