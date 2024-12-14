"use client";

import Spinner from "@/components/BlocksSpinner";
import { useAuth } from "@/hooks/useAuth";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { createItem } from "@/actions/actions";
import { Separator } from "@/components/ui/separator";
import ComboBox from "@/components/ChooseComboBox";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function ItemsAdd() {
  const { user, loading } = useAuth();

  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [publicId, setPublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [imagesId, setImagesId] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState<boolean>(false);

  const [brandsData, setBrandsData] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    try {
      const fetchBrandsData = async () => {
        const snap = await getDoc(doc(db, "data", "brands"));

        if (snap.exists()) {
          const data = snap.data();
          const transformedArray = Object.keys(data).map((field) => ({
            value: field,
            label: data[field],
          }));
          setBrandsData(transformedArray);
        }
      };
      fetchBrandsData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file && images && title && description && category && brand) {
      setCreating(true);
      const now = new Date();
      try {
        // Uploading Display Image

        const formDataDisplay = new FormData();
        formDataDisplay.append("file", file);
        formDataDisplay.append(
          "folder",
          "primeElectronics/items/displayImages"
        );

        const response = await fetch("/api/add-image", {
          method: "POST",
          body: formDataDisplay,
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Upload failed");
          return;
        }

        const data = await response.json();
        const finalId: string = data.publicId;
        // setFinalId(data.publicId);

        // Uploading other Images
        // setFinalImagesId([]);

        const finalImagesId: string[] = [];

        for (let i = 0; i < images.length; i++) {
          const formData = new FormData();
          formData.append("file", images[i]);
          formData.append("folder", "primeElectronics/items");

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

          finalImagesId.push(data.publicId);
        }

        // Adding to firebase

        const result = await createItem({
          itemName: title,
          itemDescription: description,
          itemBrandId: brand,
          itemCategory: category,
          displayImageRef: finalId,
          imagesRefs: finalImagesId,
        });

        if (result) {
          toast("Created a new Item", {
            description:
              title +
              " : " +
              ". At " +
              format(now.toISOString(), "yyyy-MM-dd HH:mm:ss"),
            action: null,
          });

          router.refresh();
        } else {
          toast("Error Occurred", {
            description:
              "Could not Create this Item : " +
              error +
              ". At " +
              format(now.toISOString(), "yyyy-MM-dd HH:mm:ss"),
            action: null,
          });
        }
      } catch (error) {
        toast("Error Occurred", {
          description:
            "Could not Create this Item : " +
            error +
            ". At " +
            format(now.toISOString(), "yyyy-MM-dd HH:mm:ss"),
          action: null,
        });
      } finally {
        setCreating(false);
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Exit if no files are selected

    const files = Array.from(event.target.files); // Convert FileList to an array
    setImages((prevImages) => [...prevImages, ...files]); // Append new files to the existing state
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
      formData.append("folder", "primeElectronics/draft");

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

  const handleImagesUpload = async () => {
    if (images.length === 0 || images.length === imagesId.length) {
      return;
    }
    setUploadingImages(true);
    setImagesId([]);

    for (let i = 0; i < images.length; i++) {
      try {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("folder", "primeElectronics/draft");

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

        setImagesId((prev) => [...prev, data.publicId]);
      } catch (err) {
        console.log(err);
        setError("An unexpected error occurred.");
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const changeBrand = (value: string) => {
    setBrand(value);
  };

  return (
    <div>
      {creating ? (
        <div className="flex items-center flex-col my-16">
          <span className="text-4xl font-semibold">
            Creating the item! Please wait...
          </span>
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center h-full gap-2">
            <form
              className="flex flex-col gap-2 border-2 border-black p-4"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-4xl font-bold p-2">
                Item Details
              </h1>
              <div className="flex flex-row items-center justify-center">
                <span className="font-semibold mr-2 w-1/2 text-center">
                  Title
                </span>
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
              <div className="flex flex-row items-center justify-center">
                <span className="font-semibold mr-2 w-1/2 text-center">
                  Category
                </span>
                <input
                  className="bg-gray-200 border-2 border-black rounded p-2"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center justify-center">
                <span className="font-semibold mr-2 w-1/2 text-center">
                  Brand
                </span>
                <ComboBox
                  defaultValue="Choose a brand"
                  datas={brandsData}
                  valueChange={changeBrand}
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
              <div className="flex justify-center">
                <span className="text-2xl font-semibold">
                  {publicId
                    ? "Preview of Display Image"
                    : "Select Display Image"}
                </span>
              </div>

              {!publicId && (
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
              )}
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

          <div className="flex items-center justify-center">
            <div className="border-2 border-black rounded p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <button
                onClick={handleImagesUpload}
                className={`mx-10 p-2 rounded ${
                  !uploadingImages
                    ? "bg-teal-200 hover:bg-teal-500"
                    : "bg-teal-700"
                }`}
                disabled={uploadingImages}
              >
                {uploadingImages ? "Uploading" : "Upload Selected Images"}
              </button>

              <span className="ml-20">Selected Images : {images.length}</span>
              {imagesId.length !== 0 && (
                <>
                  <Separator className="my-2 bg-black" />
                  <div className="grid grid-cols-3 gap-4 bg-gray-200 p-1">
                    {imagesId.map((imageId) => (
                      <div key={imageId} className="border-black border-2">
                        <CldImage
                          width="300"
                          height="300"
                          quality="auto"
                          crop="auto"
                          src={imageId}
                          alt="Description of my image"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsAdd;
