"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../components/breadCrumbs/page";

export default function VerifyEmailPage() {

  const UploadPage = async () => {
  }


  return (
  <div className="pb-12 grid m-auto">
  <BreadcrumbComp />
    <div className="flex gap-6 m-auto">
        <Link className="bg-purple-100 p-20 text-xl rounded-lg dark:text-black hover:bg-purple-200" href="/upload-artist">Upload artist</Link>
        <Link className="bg-purple-100 p-20 text-xl rounded-lg dark:text-black hover:bg-purple-200" href="/upload-concert">Upload concert</Link>
    </div>
    </div>
  );
}
