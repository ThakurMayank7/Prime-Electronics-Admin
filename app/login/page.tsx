"use client";

import { signInWithGoogle } from "@/firebase/auth";
import React from "react";

function Login() {
  const verifyAdminEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={verifyAdminEmail}
      >
        <span>Enter Admin Email</span>
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-black rounded p-2 "
        />
        <button
          className="bg-green-500 rounded p-2 border-2 border-black"
          type="submit"
        >
          Verify
        </button>
      </form>

      <button onClick={() =>signInWithGoogle()}>Login(temporary)</button>
    </div>
  );
}

export default Login;
