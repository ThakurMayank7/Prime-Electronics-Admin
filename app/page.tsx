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



  // const handleSignOut = () => {signOutUser()};

  return (
    // <div>
    //   {user?.displayName}
    //   <button className="bg-red-600 rounded p-2 border-2 border-black" onClick={handleSignOut}>Sign Out</button>
    // </div>
    <div className="flex flex-col justify-center items-center h-screen gap-2">
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
    </div>
  );
}
