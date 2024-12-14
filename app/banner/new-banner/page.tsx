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
import { booleanValues, colors } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { createBanner } from "@/actions/actions";

type itemDetails = {
  itemId: string;
  itemName: string;
  itemDescription: string;
  itemDisplayImageId: string;
};

function AddBanner() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [colorLeftPanel, setColorLeftPanel] = useState<string>("cyan-400");
  const [colorRightPanel, setColorRightPanel] = useState<string>("red-300");
  const [highlightedText, setHighlightedText] = useState<string>("50% OFF!!!");
  const [highlightedTextColor, setHighlightedTextColor] =
    useState<string>("white");
  const [titleColor, setTitleColor] =
    useState<string>("blue-950");
  const [descriptionColor, setDescriptionColor] =
    useState<string>("black");
  const [secondaryHighlightedTextColor, setSecondaryHighlightedTextColor] =
    useState<string>("indigo-900");

  const [isTitlePresent, setTitlePresent] = useState<string>("false");

  const [bannerTitle, setBannerTitle] = useState<string>("");

  const [bannerDescription, setBannerDescription] = useState<string>("");

  const [isBannerDescriptionPresent, setBannerDescriptionPresent] =
    useState<string>("true");
  const [bannerSecondaryHighlighted, setBannerSecondaryHighlighted] =
    useState<string>("");

  const [
    isBannerSecondaryHighlightedPresent,
    setIsBannerSecondaryHighlightedPresent,
  ] = useState<string>("true");

  const [isItemFeatured, setItemFeatured] = useState<string>("false");
  const [items, setItems] = useState<{ value: string; label: string }[]>([]);

  const [itemDetails, setItemDetails] = useState<itemDetails>({itemId:"",itemDescription:"",itemDisplayImageId:"",itemName:""});

  const [isButtonPresent, setButtonPresent] = useState<string>("true");

  const [buttonOptions, setButtonOptions] = useState<
    { value: string; label: string }[]
  >([
    { value: "none", label: "None" },
    { value: "custom", label: "Custom" },
  ]);

  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    try {
      const fetchBrandsData = async () => {
        const snap = await getDoc(doc(db, "data", "items"));

        if (snap.exists()) {
          const data = snap.data();
          const transformedArray = Object.keys(data).map((field) => ({
            value: field,
            label: data[field],
          }));
          setItems(transformedArray);
        }
      };
      fetchBrandsData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (!isItemFeatured) return;

    try {
      const fetchBrandsData = async () => {
        const snap = await getDoc(doc(db, "items", isItemFeatured));

        if (snap.exists()) {
          // console.log(snap.data())
          const data = snap.data();
          const details: itemDetails = {
            itemId: isItemFeatured,
            itemName: data.itemName,
            itemDescription: data.itemDescription,
            itemDisplayImageId: data.displayImageRef,
          };
          setItemDetails(details);
          // const data = snap.data();
          // TODO get item details here
          // setItems(transformedArray);
        }
      };
      fetchBrandsData();
    } catch (error) {
      console.error(error);
    }
  }, [isItemFeatured]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
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
  const changeTitleColor = (color: string) => {
    setTitleColor(color);
  };
  const changeDescriptionColor = (color: string) => {
    setDescriptionColor(color);
  };
  const changeSecondaryHighlightedColor = (color: string) => {
    setSecondaryHighlightedTextColor(color);
  };
  const changeTitlePresence = (value: string) => {
    setTitlePresent(value);
  };
  const changeBannerDescriptionPresence = (value: string) => {
    setBannerDescriptionPresent(value);
  };
  const changeItemFeatured = (value: string) => {
    setItemFeatured(value);

    if (value !== "") {
      const opt = buttonOptions;
      if (opt.length === 3) {
        opt[2].label = "Item Selected";
        opt[2].value = value;
      } else {
        opt.push({ label: "Item Selected", value: value });
      }
      setButtonOptions(opt);
    } else if (value === "") {
      if (buttonOptions.length === 3) {
        const opt = buttonOptions;
        opt.pop();
        setButtonOptions(opt);
      }
    }
  };
  const changeSecondaryHighlightedPresent = (value: string) => {
    setIsBannerSecondaryHighlightedPresent(value);
  };
  const changeButtonPresence = (value: string) => {
    setButtonPresent(value);
  };

  const handleCreateBanner = async () => {
    setCreating(true);

    try{

      type bannerData={
        bannerTitle:string;
        bannerTitleColor:string;
        bannerDescription:string;
        bannerDescriptionColor:string;
        bannerHighlightedText:string;
        bannerHighlightedTextColor:string;
        bannerSecondaryHighlightedText:string;
        bannerSecondaryHighlightedTextColor:string;
        isItemFeatured:string;
        leftPanelColor:string;
        rightPanelColor:string;
        // currently this button only contains two options true if item featured or false if no button
        isNavigationButton:string;
        presence:{
          button:boolean,
          isItemFeatured:boolean,

          isHighlightedPresent:boolean,
          isSecondaryHighlightedPresent:boolean,
          isDescriptionPresent:boolean,
          isTitlePresent:boolean,
        }
        itemFeaturedId:string;
      }


      const bannerDetails:bannerData={
        bannerTitle:bannerTitle,

        bannerTitleColor:titleColor,
        bannerDescription:bannerDescription,
        bannerDescriptionColor:descriptionColor,
        bannerHighlightedText:highlightedText,
        bannerHighlightedTextColor:highlightedTextColor,
        bannerSecondaryHighlightedText:bannerSecondaryHighlighted,
        bannerSecondaryHighlightedTextColor:secondaryHighlightedTextColor,

      }

      const result=await createBanner(
        {
          
        }
      )



      // TODO make a sonner toast
      router.push('/');

    }
    catch(e) {console.error(e);setCreating(false);}
  };

  return (
    <>
      {creating ? (
        <div className="flex items-center flex-col my-16">
          <span className="text-4xl font-semibold">
            Creating the Banner! Please wait...
          </span>
          <br />
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="w-[1400px] h-[500px] flex flex-row"
            // style={{ backgroundImage: `url(${url})` }}  add later
          >
            <div
              className={`bg-${
                colorLeftPanel ? `${colorLeftPanel}` : "gray-500"
              } h-full flex flex-col 
          
          ${
            !(isItemFeatured === "false" || isItemFeatured === "")
              ? "w-2/3"
              : "w-full"
          }
          
          `}
            >
              <div className="flex items-center justify-center">
                {/* Highlighted Text */}
                <span
                  className={`text-${highlightedTextColor} font-semibold text-8xl`}
                >
                  {highlightedText}
                </span>
              </div>
              <br />
              <div className="flex flex-col items-center">
                {isTitlePresent === "none" ? (
                  <></>
                ) : isTitlePresent === "false" ? (
                  <span className={`text-${titleColor} font-semibold text-6xl font-serif`}>
                    {itemDetails?.itemName}
                  </span>
                ) : (
                  <span className={`text-${titleColor} font-semibold text-6xl font-serif`}>
                    {bannerTitle}
                  </span>
                )}

                {/* Description */}
                {isBannerDescriptionPresent === "none" ? (
                  <></>
                ) : isBannerDescriptionPresent === "false" ? (
                  <span className={`text-${descriptionColor} text-sm mt-2 font-medium`}>
                    {itemDetails?.itemDescription}
                  </span>
                ) : (
                  <span className={`text-${descriptionColor} text-sm mt-2 font-medium`}>
                    {bannerDescription}
                  </span>
                )}
              </div>

              {/* Secondary Highlighted */}
              {isBannerSecondaryHighlightedPresent === "none" ? (
                <></>
              ) : isBannerSecondaryHighlightedPresent === "false" ? (
                <div className="flex items-center flex-col my-auto">
                  <span className={`text-6xl text-${secondaryHighlightedTextColor} font-semibold font-mono`}>
                    Dont miss out on this deal!
                  </span>
                </div>
              ) : (
                <div className="flex items-center flex-col my-auto">
                  <span className={`text-6xl text-${secondaryHighlightedTextColor} font-semibold font-mono`}>
                    {bannerSecondaryHighlighted}
                  </span>
                </div>
              )}

              {isButtonPresent==="none"?
              
              
              <></>
              :
              <div className="flex mt-auto">
                <button className="ml-40 mb-20 text-2xl bg-black p-2 rounded text-white flex items-center gap-2 ">
                  Buy Now
                  <SquareArrowUpRight />
                </button>
              </div>
                }
            </div>

            {!(isItemFeatured === "false" || isItemFeatured === "") && (
              <div
                className={`w-1/3 bg-${colorRightPanel} h-full flex items-center justify-center`}
              >
                <Card className="w-1/2">
                  <CardHeader>
                    <CardTitle>{itemDetails.itemName}</CardTitle>
                    <CardDescription className="break-words w-fit">
                      {itemDetails?.itemDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CldImage
                      src={itemDetails?.itemDisplayImageId||"samples/balloons"} // Use this sample image or upload your own via the Media Explorer
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
            )}
          </div>

          <div className="w-full p-10">
            <div className="border-2 border-black rounded p-2">
              {/* Feature items */}
              <div className="flex flex-col border-2 border-black p-2">
                <div className="flex items-center">
                  <span className="text-xl">Feature a Item</span>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-2 h-6"
                  />

                  <ComboBox
                    defaultValue="Feature a Item here"
                    datas={items}
                    valueChange={changeItemFeatured}
                  />
                </div>
              </div>

              <br />

              <div className="flex border-2 border-black items-center">
                <div className="w-1/2 p-2">
                  <div className="flex flex-row items-center justify-center">
                    <span>Left Panel Color</span>
                    <Separator
                      className="bg-black mx-2 h-6"
                      orientation="vertical"
                    />
                    <ComboBox
                      defaultValue="Choose Color"
                      datas={colors}
                      valueChange={changeLeftPanelColor}
                    />
                  </div>
                </div>
                <Separator
                  className="bg-black mx-2 h-10"
                  orientation="vertical"
                />
                <div className="w-1/2 p-2">
                  <div className="flex flex-row items-center justify-center">
                    <span>Right Panel Color</span>
                    <Separator
                      className="bg-black mx-2 h-6"
                      orientation="vertical"
                    />
                    <ComboBox
                      defaultValue="Choose Color"
                      datas={colors}
                      valueChange={changeRightPanelColor}
                    />
                  </div>
                </div>
              </div>

              <br />
              <div className="flex flex-col border-2 border-black p-2">
                <span className="text-xl">Highlighted Text</span>
                <Separator className="bg-black my-1" />
                <div className="flex flex-row items-center">
                  <div className="w-1/2 flex flex-row justify-center items-center">
                    <span>Text</span>
                    <Separator
                      orientation="vertical"
                      className="bg-black mx-2 h-6"
                    />
                    <input
                      placeholder="Enter Highlighted Text"
                      className="border-2 border-black rounded p-1"
                      type="text"
                      value={highlightedText}
                      onChange={(e) => setHighlightedText(e.target.value)}
                    />
                  </div>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-1 h-10"
                  />
                  <div className="w-1/2 flex flex-row justify-center items-center">
                    <span>Highlighted Text Color</span>
                    <Separator
                      orientation="vertical"
                      className="bg-black mx-2 h-6"
                    />
                    <ComboBox
                      defaultValue="Choose Color"
                      datas={colors}
                      valueChange={changeHighlightedTextColor}
                    />
                  </div>
                </div>
              </div>

              <br />
              <div className="flex flex-col border-2 border-black p-2">
                <div className="flex items-center">
                  <span className="text-xl">Title</span>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-2 h-6"
                  />

                  <ComboBox
                    defaultValue="Default"
                    datas={booleanValues}
                    valueChange={changeTitlePresence}
                  />
                </div>

                {isTitlePresent === "true" && (
                  <>
                    <Separator className="bg-black my-1" />
                    <div className="flex flex-row items-center">
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Text</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <input
                          placeholder="Enter Title"
                          className="border-2 border-black rounded p-1"
                          type="text"
                          value={bannerTitle}
                          onChange={(e) => setBannerTitle(e.target.value)}
                        />
                      </div>
                      <Separator
                        orientation="vertical"
                        className="bg-black mx-1 h-10"
                      />
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Highlighted Text Color</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <ComboBox
                          defaultValue="Choose Color"
                          datas={colors}
                          valueChange={changeTitleColor}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <br />
              <div className="flex flex-col border-2 border-black p-2">
                <div className="flex items-center">
                  <span className="text-xl">Description</span>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-2 h-6"
                  />

                  <ComboBox
                    defaultValue="Default"
                    datas={booleanValues}
                    valueChange={changeBannerDescriptionPresence}
                  />
                </div>

                {isBannerDescriptionPresent === "true" && (
                  <>
                    <Separator className="bg-black my-1" />
                    <div className="flex flex-row items-center">
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Text</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <input
                          placeholder="Enter Description"
                          className="border-2 border-black rounded p-1"
                          type="text"
                          value={bannerDescription}
                          onChange={(e) => setBannerDescription(e.target.value)}
                        />
                      </div>
                      <Separator
                        orientation="vertical"
                        className="bg-black mx-1 h-10"
                      />
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Highlighted Text Color</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <ComboBox
                          defaultValue="Choose Color"
                          datas={colors}
                          valueChange={changeDescriptionColor}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Secondary highlighted text */}
              <br />
              <div className="flex flex-col border-2 border-black p-2">
                <div className="flex items-center">
                  <span className="text-xl">Secondary Highlighted Text</span>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-2 h-6"
                  />

                  <ComboBox
                    defaultValue="Default"
                    datas={booleanValues}
                    valueChange={changeSecondaryHighlightedPresent}
                  />
                </div>

                {isBannerSecondaryHighlightedPresent === "true" && (
                  <>
                    <Separator className="bg-black my-1" />
                    <div className="flex flex-row items-center">
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Text</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <input
                          placeholder="Enter Description"
                          className="border-2 border-black rounded p-1"
                          type="text"
                          value={bannerSecondaryHighlighted}
                          onChange={(e) =>
                            setBannerSecondaryHighlighted(e.target.value)
                          }
                        />
                      </div>
                      <Separator
                        orientation="vertical"
                        className="bg-black mx-1 h-10"
                      />
                      <div className="w-1/2 flex flex-row justify-center items-center">
                        <span>Text Color</span>
                        <Separator
                          orientation="vertical"
                          className="bg-black mx-2 h-6"
                        />
                        <ComboBox
                          defaultValue="Choose Color"
                          datas={colors}
                          valueChange={changeSecondaryHighlightedColor}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <br />
              <div className="flex border-2 border-black items-center p-2">
                <div className="flex items-center">
                  <span className="text-xl">Navigation Button</span>
                  <Separator
                    orientation="vertical"
                    className="bg-black mx-2 h-6"
                  />

                  <ComboBox
                    defaultValue="Default"
                    datas={buttonOptions}
                    valueChange={changeButtonPresence}
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center justify-center">
                <button
                  onClick={handleCreateBanner}
                  className="text-2xl font-serif bg-teal-600 hover:bg-teal-800 text-white p-2 rounded"
                >
                  Create Banner
                </button>
              </div>
              <br />
            </div>
          </div>
        </div>
      )}
      {isButtonPresent}
    </>
  );
}

export default AddBanner;
