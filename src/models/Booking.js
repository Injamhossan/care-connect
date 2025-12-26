import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export class Booking {
  static async create(bookingData) {
    const db = await getDatabase();
    // Ensure date is a Date object if passed as string
    if (typeof bookingData.date === 'string') {
        bookingData.date = new Date(bookingData.date);
    }
    bookingData.createdAt = new Date();
    bookingData.status = bookingData.status || 'Pending';
    
    return db.collection("bookings").insertOne(bookingData);
  }

  static async findByEmail(email) {
    const db = await getDatabase();
    // Sort by date descending
    return db.collection("bookings").find({ userEmail: email }).sort({ date: -1 }).toArray();
  }

  static async findById(id) {
    const db = await getDatabase();
    return db.collection("bookings").findOne({ _id: new ObjectId(id) });
  }
  static async findAllPayments() {
    const db = await getDatabase();
    return db.collection("bookings")
      .find({ "paymentInfo": { $ne: null } })
      .sort({ "paymentInfo.date": -1 })
      .toArray();
  }
}
