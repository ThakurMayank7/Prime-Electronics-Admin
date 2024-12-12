'use client'

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function AddBanner() {

    const { user, loading } = useAuth();
    
    const router = useRouter();




    const [title, setTitle] = useState<string>("");
      const [description, setDescription] = useState<string>("");
      const [category, setCategory] = useState<string>("");
      const [brand, setBrand] = useState<string>("");
    



      
      useEffect(() => {
        if (user === null && loading === false) {
          router.push("/login");
        }
      }, [user, router, loading]);
    
      if (loading) {
        return <p>loading...</p>;
      }


      
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
      





          setTitle("");
          setDescription("");
          setCategory("");
          setBrand("");
      
        };












  return (
    <div className='flex items-center justify-center h-full'>



<form
        className="flex flex-col gap-2 border-2 border-black p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-4xl font-bold p-2">Item Details</h1>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">Title</span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text" value={title} onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">
            Description
          </span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text" value={description} onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">Category</span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text" value={category} onChange={(e)=>setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">Brand</span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text" value={brand} onChange={(e)=>setBrand(e.target.value)}
          />
        </div>

        <br />
        <button
          className="bg-green-500 hover:bg-green-600 rounded p-2 border-2 border-black font-bold"
          type="submit"
        >
          Add Item
        </button>
      </form>



    </div>
  )
}

export default AddBanner