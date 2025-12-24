import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export class User {
  static async findOne(query) {
    const db = await getDatabase();
    return db.collection("users").findOne(query);
  }

  static async create(userData) {
    const db = await getDatabase();
    return db.collection("users").insertOne(userData);
  }

  static async update(email, updateData) {
    const db = await getDatabase();
    return db.collection("users").updateOne(
        { email: email },
        { $set: updateData }
    );
  }
}
