'use client';

import { Button } from '@/components/ui/button'
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function BestDeals() {

  const [allItems,setAllItems]=useState<{id:string,title:string}[]>([]);

  const [items,setItems]=useState<{position:string,item:string}[]>([]);


  useEffect(()=>{

try{

  const fetchData=async()=>{


    const allItemsSnap=await getDoc(doc(db,'data','items'));

    if(allItemsSnap.exists())
    {
      const result=allItemsSnap.data();


      const fetchedData=Object.keys(result).map(key=>({

        id:key,
        title:result[key],
      }));

      setAllItems(fetchedData);
    }





    const snap=await getDoc(doc(db,'featured','best-deals'));
    
    if(snap.exists())
    {
      const result=snap.data();

        // Convert fields into desired format
        const fetchedData = Object.keys(result).map((key) => ({
          position: key,
          item: result[key],
        }));

      setItems(fetchedData);
    }



  }
  fetchData();

}
catch(err){console.error(err)}
  },[])



  // Helper function to get title by ID
  const getTitleById = (id: string): string | undefined => {
    const foundItem = allItems.find((item) => item.id === id);
    return foundItem?.title;
  };

  return (
    <div>
      <div>
        {/* TODO make options to add and more here */}
        <Button>Click here</Button>
      </div>
<br />
      {/* TODO display list of best deals here */}
      <div className='border-2 border-black sm:mx-10 p-2 space-y-2 rounded'>
        {items.map(
          (item)=>(<div key={item.position} className='border-2 border-black p-2 rounded bg-green-700 text-white text-2xl flex flex-row'>
            {/* <p>Position: {item.position}Item:{item.item}</p> */}
            <p>{getTitleById(item.item) || 'Not Found'}</p>
            <div className='ml-auto'>

              {Number(item.position)>1?
              <ChevronUp/>
            :""  
            }

            {Number(item.position)<items.length?
            <ChevronDown/>
          :""  
          }
            </div>
          </div>)
        )}
      </div>
      {allItems.length!==0?allItems[0].id:""}
    </div>
  )
}

export default BestDeals