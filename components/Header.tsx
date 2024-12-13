"use client";

import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";

function Header() {
  const pathname = usePathname();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user !== null && loading === false) {
    }
  }, [user, loading]);

  if (pathname === "/login") {
    return null;
  }

  if (pathname == "/" && user !== null) {
    return (
      <div className="text-center ">
        <span className="text-2xl font-semibold">
          Welcome {user.displayName}
        </span>
        <br />
        <hr />
        <br />
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-teal-800 p-2">
        <Link
          className="flex flex-row gap-2 bg-gray-900 text-white rounded p-2 mr-auto"
          href="/"
        >
          <ArrowLeftCircle />
          Go to Home
        </Link>
      </div>
      <br />
    </>
  );
}

export default Header;
