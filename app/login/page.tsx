"use client";

import { verifyAdmin } from "@/actions/actions";
import { signInWithGoogle } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowRight } from "lucide-react";

function Login() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [verified, setVerified] = useState<boolean>(false);

  const [alertMatching, setAlertMatching] = useState<boolean>(false);
  const [alertVerification, setAlertVerification] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (user !== null && loading === false && user.email === email) {
      router.push("/");
    } else if (user !== null && loading === false && user.email !== email) {
      setAlertMatching(true);
    }
  }, [user, loading, router, email]);

  const verifyAdminEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      console.log("Email is required!");
      return; // Prevent submission if email is empty
    }

    try {
      const result = await verifyAdmin(email);

      if (result === true) {
        setVerified(true);
      } else {
        setVerified(false);
        setAlertVerification(true);
      }
    } catch (error) {
      setAlertVerification(false);
      console.log(error);
      setVerified(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {!verified ? (
        <div className="flex items-center flex-col gap-10">
          {alertVerification && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This Email is not Authorised for Admin Access
              </AlertDescription>
            </Alert>
          )}

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
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-green-500 rounded p-2 border-2 border-black"
              type="submit"
            >
              Verify
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-10 items-center">
          {alertMatching && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                The verification email and the logging email do not match.
                Kindly use the same email for logging in.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center">
            <span className="text-green-600 text-4xl">Email is Verified!</span>
            <br />
            <span className="text-lg">Continue logging with Google</span>
            <br />
            <button
              className="p-2 rounded bg-black text-white hover:bg-gray-800"
              onClick={() => signInWithGoogle()}
            >
              Sign In
            </button>
          </div>
          <button
            className="text-xs p-1 rounded-full border-2 border-black hover:p-2 hover:bg-gray-300 bg-gray-100 w-fit flex flex-row items-center justify-center"
            onClick={() => setVerified(false)}
          >
            Use any Other Email
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
