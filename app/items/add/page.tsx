"use client";

import { addItem } from "@/actions/actions";
import { useState } from "react";

function ItemsAdd() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    addItem(title,description,category,brand);


    setTitle("");
    setDescription("");
    setCategory("");
    setBrand("");

  };

  return (
    <div className="flex items-center justify-center h-screen">
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
  );
}

export default ItemsAdd;
