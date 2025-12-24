import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export class Service {
  static async findAll() {
    const db = await getDatabase();
    return db.collection("services").find({}).toArray();
  }

  static async findById(id) {
    const db = await getDatabase();
    try {
      return await db.collection("services").findOne({ _id: new ObjectId(id) });
    } catch (error) {
       // If id is not a valid ObjectId, try finding by slug
       return await db.collection("services").findOne({ slug: id });
    }
  }

  static async findBySlug(slug) {
    const db = await getDatabase();
    return db.collection("services").findOne({ slug: slug });
  }

  static async create(serviceData) {
    const db = await getDatabase();
    return db.collection("services").insertOne(serviceData);
  }
}
