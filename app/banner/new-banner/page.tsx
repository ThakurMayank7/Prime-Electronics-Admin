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
import {  booleanDefaultValues, booleanValues, colors } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

function AddBanner() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [colorLeftPanel, setColorLeftPanel] = useState<string>("cyan-400");
  const [colorRightPanel, setColorRightPanel] = useState<string>("red-300");
  const [highlightedText,setHighlightedText] = useState<string>("50% OFF!!!");
  const [highlightedTextColor,setHighlightedTextColor] = useState<string>("white");

  const [isTitlePresent,setTitlePresent] = useState<string>("false");

  const [bannerTitle,setBannerTitle] = useState<string>("");

  const [bannerDescription,setBannerDescription] = useState<string>("")

  const [isBannerDescriptionPresent,setBannerDescriptionPresent] = useState<string>("true");

  const [isItemFeatured,setItemFeatured] = useState<string>("false");


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
  const changeHighlightedTextColor = (color: string) => {
    setHighlightedTextColor(color);
  };
  const changeTitlePresence = (value: string) => {
    setTitlePresent(value);
  };
  const changeBannerDescriptionPresence = (value: string) => {
    setBannerDescriptionPresent(value);
  };
  const changeItemFeatured = (value: string) => {
    setItemFeatured(value);
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
            {/* Highlighted Text */}
            <span className={`text-${highlightedTextColor} font-semibold text-8xl`}>
              {highlightedText}
            </span>
          </div>
          <br />
          <div className="flex flex-col items-center">

            {isTitlePresent==="none"?<></>:
            
(isTitlePresent==="false"?

  <span className="text-blue-950 font-semibold text-6xl font-serif">
              DSLR Camera
            </span>
              :
  <span className="text-blue-950 font-semibold text-6xl font-serif">
              {bannerTitle}
            </span>
            )
            }



            {/* Description */}
            {isBannerDescriptionPresent==="none"?<></>:
            
            (isBannerDescriptionPresent==="false"?
            
              <span className="text-sm mt-2 font-medium">
              Professional-grade DSLR camera with 24.2 MP resolution and 4K
              video recording capabilities.
            </span>
                          :
                          <span className="text-sm mt-2 font-medium">
                          {bannerDescription}
                        </span>
                        )
                        }
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



{/* TODO Feature items */}
          <div className="flex flex-col border-2 border-black p-2">
            <div className="flex items-center">

            <span className="text-xl">Description</span>
            <Separator orientation="vertical" className="bg-black mx-2 h-6"/>


            <ComboBox defaultValue="Feature a Item here" datas={booleanDefaultValues} valueChange={changeItemFeatured} />
            </div>

{
  isItemFeatured==="true" &&
<>
          
            <Separator className="bg-black my-1"/>
<div className="flex flex-row items-center">

  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Text</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <input placeholder="Enter Description" className="border-2 border-black rounded p-1" type="text" value={bannerDescription} onChange={(e)=>setBannerDescription(e.target.value)}/>
  </div>
  <Separator orientation="vertical" className="bg-black mx-1 h-10"/>
  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Highlighted Text Color</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <ComboBox defaultValue="Choose Color" datas={colors} valueChange={changeHighlightedTextColor} />
  </div>
</div>
</>

}
</div>









<br />


          <div className="flex border-2 border-black items-center">
            <div className="w-1/2 p-2">
              <div className="flex flex-row items-center justify-center">
                <span>Left Panel Color</span>
                <Separator className="bg-black mx-2 h-6" orientation="vertical" />
                <ComboBox defaultValue="Choose Color"  datas={colors} valueChange={changeLeftPanelColor} />
              </div>
            </div>
            <Separator className="bg-black mx-2 h-10" orientation="vertical" />
            <div className="w-1/2 p-2">
              <div className="flex flex-row items-center justify-center">
                <span>Right Panel Color</span>
                <Separator className="bg-black mx-2 h-6" orientation="vertical" />
                <ComboBox defaultValue="Choose Color"  datas={colors} valueChange={changeRightPanelColor} />
              </div>
            </div>
          </div>


          
<br />
          <div className="flex flex-col border-2 border-black p-2">
            <span className="text-xl">Highlighted Text</span>
            <Separator className="bg-black my-1"/>
<div className="flex flex-row items-center">

  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Text</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <input placeholder="Enter Highlighted Text" className="border-2 border-black rounded p-1" type="text" value={highlightedText} onChange={(e)=>setHighlightedText(e.target.value)}/>
  </div>
  <Separator orientation="vertical" className="bg-black mx-1 h-10"/>
  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Highlighted Text Color</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <ComboBox defaultValue="Choose Color" datas={colors} valueChange={changeHighlightedTextColor} />
  </div>
</div>
          </div>








<br />
          <div className="flex flex-col border-2 border-black p-2">
            <div className="flex items-center">

            <span className="text-xl">Title</span>
            <Separator orientation="vertical" className="bg-black mx-2 h-6"/>


            <ComboBox defaultValue="Default" datas={booleanValues} valueChange={changeTitlePresence} />
            </div>

{
  isTitlePresent==='true' &&
<>
          
            <Separator className="bg-black my-1"/>
<div className="flex flex-row items-center">

  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Text</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <input placeholder="Enter Title" className="border-2 border-black rounded p-1" type="text" value={bannerTitle} onChange={(e)=>setBannerTitle(e.target.value)}/>
  </div>
  <Separator orientation="vertical" className="bg-black mx-1 h-10"/>
  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Highlighted Text Color</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <ComboBox defaultValue="Choose Color" datas={colors} valueChange={changeHighlightedTextColor} />
  </div>
</div>
</>

}
</div>
<br />
          <div className="flex flex-col border-2 border-black p-2">
            <div className="flex items-center">

            <span className="text-xl">Description</span>
            <Separator orientation="vertical" className="bg-black mx-2 h-6"/>


            <ComboBox defaultValue="Default" datas={booleanValues} valueChange={changeBannerDescriptionPresence} />
            </div>

{
  isBannerDescriptionPresent==="true" &&
<>
          
            <Separator className="bg-black my-1"/>
<div className="flex flex-row items-center">

  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Text</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <input placeholder="Enter Description" className="border-2 border-black rounded p-1" type="text" value={bannerDescription} onChange={(e)=>setBannerDescription(e.target.value)}/>
  </div>
  <Separator orientation="vertical" className="bg-black mx-1 h-10"/>
  <div className="w-1/2 flex flex-row justify-center items-center">
  <span>Highlighted Text Color</span>
  <Separator orientation="vertical" className="bg-black mx-2 h-6"/>
  <ComboBox defaultValue="Choose Color" datas={colors} valueChange={changeHighlightedTextColor} />
  </div>
</div>
</>

}
</div>















<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>
<br />
          <div className="flex border-2 border-black items-center">
asfdd
          </div>










        </div>
      </div>
    </div>
  );
}

export default AddBanner;
