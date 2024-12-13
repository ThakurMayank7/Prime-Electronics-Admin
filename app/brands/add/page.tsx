"use client";

import { createBrand } from "@/actions/actions";
import Spinner from "@/components/BlocksSpinner";
import { useAuth } from "@/hooks/useAuth";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function BrandsAdd() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  
  const [publicId, setPublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [finalId,setFinalId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  
  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }

    if(finalId && creating ===false)
    {
      router.push('/')
    }
  }, [user, router, loading,finalId,creating]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    if(!publicId)
    {
      setError('no file input');
      return null;
    }
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    try {
      setCreating(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "primeElectronics/brands");

      const response = await fetch("/api/add-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        return;
      }

      const data = await response.json();
      setFinalId(data.publicId);



      const result=await createBrand(title,description,data.publicId);
      if(result===true)
      {


        // TODO display a new brand is created
  
      }



    } catch (err) {
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError(null);
    setPublicId(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "primeElectronics/rendering");

      const response = await fetch("/api/add-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Upload failed");
        return;
      }

      const data = await response.json();
      setPublicId(data.publicId);
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="gap-4 flex items-center justify-center h-screen">
      <form
        className="flex flex-col gap-2 border-2 border-black p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-4xl font-bold p-2 font-serif">Brand Details</h1>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">Brand Name</span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">
            Description
          </span>
          <input
            className="bg-gray-200 border-2 border-black rounded p-2"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />
        <button
          className="bg-green-500 hover:bg-green-600 rounded p-2 border-2 border-black font-bold"
          type="submit"
        >
          Create Brand
        </button>
      </form>
      <div className="border-2 border-black p-4">
        <div className="flex justify-center">
        <span className="text-2xl font-semibold">
          {publicId ? "Preview of Logo" : "Select a Logo"}
        </span>
        </div>

        {!publicId && 
        <div>
          <input
            type="file"
            accept="image/*"
            multiple={false} // Disallow multiple file selection
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-teal-200 p-2 rounded hover:bg-teal-500"
            >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
          }
        {publicId && (
          <div className="bg-cyan-400">
            <CldImage
              width="400"
              height="400"
              quality="auto"
              crop="auto"
              src={publicId}
              alt="Description of my image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandsAdd;
