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