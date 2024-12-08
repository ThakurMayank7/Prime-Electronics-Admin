'use client';

import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




type Item = {
  id: string;
  title:string;
  description:string;
  category:string;
  brand:string; // Adjust the type based on your Firestore fields
};


function ItemsWatch() {


  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {


    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        const items: Item[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(),
        })) as Item[]; // Type assertion to match the Item type

        setData(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();



  },[]);



  return (
    <div>
  {loading ? (
    <span>Displaying Data...</span> // Show this when loading is true
  ) : (
    <div className="grid grid-cols-2 gap-4">
      {data.map((item) => (
        <div key={item.id}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card {item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.category}</p>
            </CardContent>
            <CardFooter>
              <p>Item ID : {item.id}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )}
</div>

  )
}

export default ItemsWatch