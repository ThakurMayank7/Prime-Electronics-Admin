'use client';

// import { signOutUser } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { signOutUser } from "@/firebase/auth";



export default function Home() {

  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    
    <div className="flex flex-col justify-center items-center gap-2">
      <span className="text-4xl font-bold">Choose Action</span>

      <div className="flex gap-2 justify-center mx-10">

      <Card>
  <CardHeader>
    <CardTitle>Add Items</CardTitle>
    <CardDescription>
      <span>
      Add a new item using this option
      </span>
      </CardDescription>
  </CardHeader>
  <CardContent>
    
  <Link className="bg-cyan-900 text-white p-2 rounded" href="/items/add">Add</Link>
  </CardContent>
  
</Card>


<Card>
  <CardHeader>
    <CardTitle>View Items</CardTitle>
    <CardDescription>View all the current items</CardDescription>
  </CardHeader>
  <CardContent>
  <Link className="bg-cyan-900 text-white p-2 rounded" href="/items/watch">View</Link>
  </CardContent>
  
</Card>






      </div>


<div className="flex gap-2">
<Card>
  <CardHeader>
    <CardTitle>Add a Brand</CardTitle>
    <CardDescription>Add a new brand using this option</CardDescription>
  </CardHeader>
  <CardContent>
    <Link className="bg-cyan-900 text-white p-2 rounded" href="/brands/add">Add</Link>
  
  </CardContent>
  
</Card>


<Card>
  <CardHeader>
    <CardTitle>View Brands</CardTitle>
    <CardDescription>View all the current brands using this option</CardDescription>
  </CardHeader>
  <CardContent>
    <Link className="bg-cyan-900 text-white p-2 rounded" href="/brands/watch">View</Link>
  
  </CardContent>
  
</Card>
</div>


<div>
  <span className="text-lg">Customize here</span>
</div>


      <div>
      <Card>
  <CardHeader>
    <CardTitle>Edit Best Deals</CardTitle>
    <CardDescription>Select this option if you want to edit the banner of home page</CardDescription>
  </CardHeader>
  <CardContent>
    <Link className="bg-cyan-900 text-white p-2 rounded" href="/brands/watch">Go to Best Deals</Link>
  
  </CardContent>
  
</Card>

      </div>

      <Card>
  <CardHeader>
    <CardTitle>Edit Displayed Categories</CardTitle>
    <CardDescription>Select this option if you want to edit the banner of home page</CardDescription>
  </CardHeader>
  <CardContent>
    <Link className="bg-cyan-900 text-white p-2 rounded" href="/brands/watch">Go to Displayed Categories</Link>
  
  </CardContent>
  
</Card>

      <div>
      <Card>
  <CardHeader>
    <CardTitle>Edit Featured Brands</CardTitle>
    <CardDescription>Select this option if you want to edit the banner of home page</CardDescription>
  </CardHeader>
  <CardContent>
    <Link className="bg-cyan-900 text-white p-2 rounded" href="/brands/watch">Go to Featured Brands</Link>
  
  </CardContent>
  
</Card>

      </div>


      <button className="bg-red-600 p-2 rounded text-white hover:bg-red-700" onClick={()=>signOutUser()}>Sign Out</button>


    </div>
  );
}
