"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl">Verify Email</h1>

      {verified && (
        <div className="text-center grid gap-4">
          <h2 className="text-2xl brand_purple pt-4">
            Your email has been verified
          </h2>
        </div>
      )}
      {error && (
        <div className="pt-4">
          <h2 className="text-4xl text-red-500">There was an Error</h2>
        </div>
      )}
    </div>
  );
}
