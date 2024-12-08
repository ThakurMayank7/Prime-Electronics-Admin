"use client";

import { verifyAdmin } from "@/actions/actions";
import { signInWithGoogle } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {


  const router=useRouter();


    const {user,loading}=useAuth();


    
    const [verified,setVerified]=useState<boolean>(false);
    
    
    const [email,setEmail]=useState<string>("");
    useEffect(()=>{

        if(user!==null && loading===false && user.email===email)
        {
            router.push("/");
        } else if(user!==null && loading===false &&user.email!==email)
        {
          // TODO add alert to use same email when logging in
        }
    },[user,loading,router,email]);




  const verifyAdminEmail = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    if (!email) {
      console.log('Email is required!');
      return; // Prevent submission if email is empty
    }
  
    try {
      const result = await verifyAdmin(email);
  
      if (result === true) {
        setVerified(true);

        console.log('Admin verified');
      } else {
        setVerified(false);
        console.log('Admin verification failed');
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      setVerified(false);
    }



  };

  return (
    <div className="flex items-center justify-center h-screen">



{!verified?

<form
        className="flex flex-col items-center gap-2"
        onSubmit={verifyAdminEmail}
      >
        <span className="text-xl font-semibold">Enter Admin Email</span>
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-black rounded p-2 "
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button
          className="bg-green-500 rounded p-2 border-2 border-black"
          type="submit"
        >
          Verify
        </button>
      </form>
        
   :
   
   <div className="flex flex-col items-center">
<span className="text-green-600 text-4xl">Email is Verified!</span>
<br />
<span className="text-lg">Continue logging with Google</span>
<br />
<button className="p-2 rounded bg-black text-white hover:bg-gray-800" onClick={()=>signInWithGoogle()}>Sign In</button>

   </div>
   
   
   
   }
    </div>
  );
}

export default Login;
