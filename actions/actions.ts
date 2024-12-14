"use server";

import { adminDb } from "@/firebase/admin";

export async function addItem(
  title: string,
  description: string,
  category: string,
  brand: string
) {
  await adminDb.collection("test").add({
    title: title,
    description: description,
    category: category,
    brand: brand,
  });
}

export async function verifyAdmin(email: string): Promise<boolean> {
  try {
    const snapshot = await adminDb
      .collection("admins")
      .where("email", "==", email)
      .get(); // Query and get the data

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

export async function createBrand(
  brandName: string,
  brandDescription: string,
  logoRef: string
): Promise<boolean> {
  try {
    const result = await adminDb.collection("brands").add({
      brandName: brandName,
      brandDescription: brandDescription,
      logoRef: logoRef,
    });
    if (!result.id) {
      return false;
    }

    await adminDb
  .collection("data")
  .doc("brands")
  .set({ [result.id]: brandName }, { merge: true });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function createItem({
  itemName,
  itemDescription,
  displayImageRef,
  imagesRefs,
  itemBrandId,
  itemCategory,
}: {
  itemName: string;
  itemDescription: string;
  itemBrandId: string;
  itemCategory: string;
  displayImageRef: string;
  imagesRefs: string[];
}): Promise<boolean> {
  try {
    const result = await adminDb.collection("items").add({
      itemName: itemName,
      itemDescription: itemDescription,
      displayImageRef: displayImageRef,
      imagesRefs: imagesRefs,
      brandId:itemBrandId,
      category:itemCategory,
    });
    if (!result.id) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
