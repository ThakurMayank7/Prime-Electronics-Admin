'use server';

import { adminDb } from "@/firebase/admin";

export async function addItem(title:string,description:string,category:string,brand:string)
{
    await adminDb.collection("test").add(
        {
            "title":title,
            "description":description,
            "category":category,
            "brand":brand
        });
}

export async function verifyAdmin(email: string): Promise<boolean> {
    try {
      const snapshot = await adminDb.collection('admins').where('email', '==', email).get(); // Query and get the data
  
      // Check if any document was found
      if (snapshot.empty) {
        return false; // No admin found with the given email
      } else {
        return true; // Admin exists
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false; // Handle error and return false
    }
  }
  