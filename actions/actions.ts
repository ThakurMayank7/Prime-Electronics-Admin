'use server';

import { adminDb } from "@/firebase/admin";

export async function addItem(title:string,description:string,brand:string,category:string)
{
    await adminDb.collection("test").add(
        {
            "title":title,
            "description":description,
            "category":category,
            "brand":brand
        });
}