"use client";

import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

function BrandsAdd() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isLogoSelected, setIsLogoSelected] = useState<boolean>(false);

  const [logoId, setLogoId] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [publicId, setPublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // addItem(title,description);

    setTitle("");
    setDescription("");
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
      formData.append("folder", "yourDynamicFolderName");

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
        <h1 className="text-center text-4xl font-bold p-2">Item Details</h1>
        <div className="flex flex-row items-center justify-center">
          <span className="font-semibold mr-2 w-1/2 text-center">Name</span>
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
          Add Item
        </button>
      </form>
      <div className="border-2 border-black p-4">
        <span className="text-center text-2xl font-semibold">
          {isLogoSelected ? "Preview of Logo" : "Select a Logo"}
        </span>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple={false} // Disallow multiple file selection
            onChange={handleFileChange}
            className="mb-4"
          />
          <button onClick={handleUpload}>Upload Image</button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-teal-200 p-2 rounded hover:bg-teal-500"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
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
      {error}
    </div>
  );
}

export default BrandsAdd;
