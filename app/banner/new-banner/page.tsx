"use client";

import { useAuth } from "@/hooks/useAuth";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SquareArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ComboBox from "@/components/ChooseComboBox";
import { colors } from "@/lib/constants";

function AddBanner() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [colorLeftPanel, setColorLeftPanel] = useState<string>("cyan-400");
  const [colorRightPanel, setColorRightPanel] = useState<string>("red-300");

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return <p>loading...</p>;
  }

  const changeLeftPanelColor = (color: string) => {
    setColorLeftPanel(color);
  };
  const changeRightPanelColor = (color: string) => {
    setColorRightPanel(color);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[1400px] h-[500px] flex flex-row"
        // style={{ backgroundImage: `url(${url})` }}  add later
      >
        <div
          className={`w-2/3 bg-${
            colorLeftPanel ? `${colorLeftPanel}` : "gray-500"
          } h-full flex flex-col`}
        >
          <div className="flex items-center justify-center">
            <span className="text-white font-semibold text-8xl">
              50% OFF!!!
            </span>
          </div>
          <br />
          <div className="flex flex-col items-center">
            <span className="text-blue-950 font-semibold text-6xl font-serif">
              DSLR Camera
            </span>
            <span className="text-sm mt-2 font-medium">
              Professional-grade DSLR camera with 24.2 MP resolution and 4K
              video recording capabilities.
            </span>
          </div>

          <div className="flex items-center flex-col my-auto">
            <span className="text-6xl text-indigo-900 font-semibold font-mono">
              Dont miss out on this deal!
            </span>
          </div>

          <div className="flex mt-auto">
            <button className="ml-40 mb-20 text-2xl bg-black p-2 rounded text-white flex items-center gap-2 ">
              Buy Now
              <SquareArrowUpRight />
            </button>
          </div>
        </div>

        <div
          className={`w-1/3 bg-${colorRightPanel} h-full flex items-center justify-center`}
        >
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>DSLR Camera</CardTitle>
              <CardDescription className="break-words w-fit">
                Professional-grade DSLR camera with 24.2 MP resolution and 4K
                video recording capabilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CldImage
                src="cld-sample-2" // Use this sample image or upload your own via the Media Explorer
                width="200" // Transform the image: auto-crop to square aspect_ratio
                height="200"
                alt="banner"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full p-10">
        <div className="border-2 border-black rounded p-2">
          <div className="flex">
            <div className="w-1/2 border-2 border-black p-2">
              <div>
                <span>Left Panel Color</span>
                <ComboBox datas={colors} valueChange={changeLeftPanelColor} />
              </div>
            </div>
            <div className="w-1/2 border-2 border-black p-2">
              <div>
                <span>Right Panel Color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBanner;
