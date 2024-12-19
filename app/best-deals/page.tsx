'use client';

import { Button } from '@/components/ui/button'
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

function BestDeals() {

  const [allItems,setAllItems]=useState<{id:string,title:string}[]>([]);

  const [itemsId,setItemsId]=useState<{position:string,item:string}[]>([]);

  const [items,setItems]=useState();


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

      setItemsId(fetchedData);
    }



  }
  fetchData();

}
catch(err){console.error(err)}
  },[])

  return (
    <div>
      <div>
        {/* TODO make options to add and more here */}
        <Button>Click here</Button>
      </div>
<br />
      {/* TODO display list of best deals here */}
      <div className='border-2 border-black sm:mx-10 p-2 space-y-2'>
        {itemsId.map(
          (item)=>(<div key={item.position} className='border-2 border-black p-2'>
            {item.item}
          </div>)
        )}
      </div>
      {allItems.length!==0?allItems[0].id:""}
    </div>
  )
}

export default BestDeals