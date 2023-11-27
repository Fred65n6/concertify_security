"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlHeart, SlEmotsmile, SlGrid, SlLock } from "react-icons/sl";
import Search from "../search/page";
import ThemeSwitcher from "../switchTheme/page";


const NavAdmin = () => {
return (
<>
{/* DESKTOP */}
<div className="hidden lg:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:px-14">
   <div className="flex gap-8 items-center w-fit">
      <Link href="/">
      <Image
         src="../concertify.svg"
         width={30}
         height={30}
         alt="concertify_logo"
         />
      </Link>
      <ul className="flex gap-10 brand_purple">
         <li>
            <Link className="flex gap-2 items-center" href="/concerts">
            <span className="text-[#5311BF] dark:text-white">Explore</span>
            </Link>
         </li>
         <li>
            <Link className="flex gap-2 items-center" href="/favourites">
            <span className="text-[#5311BF] dark:text-white">Favourites</span>
            </Link>
         </li>
         <li>
            <Link className="flex gap-2 items-center" href="/admin-dashboard">
            <span className="text-[#5311BF] dark:text-white">Admin</span>
            </Link>
         </li>
      </ul>
   </div>
   <div className="flex gap-2 items-center">
      <Search />
      <Link href="/profile/${data}">
      <button className="w-fit flex gap-2 py-2 px-6 items-center m-auto rounded-full bg-purple-100 brand_purple hover:bg-purple-200">
         <span className="text-[#5311BF]">Profile</span>
         <SlEmotsmile
            className="fill-[#5311BF] w-5 h-5 flex gap-2"
            id="user"
            />
      </button>
      </Link>
      <ThemeSwitcher />
   </div>
</div>

{/* TABLET */}
<div className="hidden md:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:hidden">
   <div className="flex gap-8 items-center w-fit">
      <Link href="/">
      <Image
         src="../concertify.svg"
         width={25}
         height={30}
         alt="concertify_logo"
         />
      </Link>
      <ul className="flex gap-10 brand_purple">
         <li>
            <Link className="flex gap-2 items-center" href="/concerts">
            <SlGrid
               className="fill-[#5311BF] dark:fill-white w-5 h-5"
               id="explore"
               />
            </Link>
         </li>
         <li>
            <Link className="flex gap-2 items-center" href="/favourites">
            <SlHeart
               className="fill-[#5311BF] dark:fill-white w-5 h-5"
               id="favourites"
               />
            </Link>
         </li>
         <li>
            <Link className="flex gap-2 items-center" href="/admin-dashboard">
            <SlLock
               className="fill-[#5311BF] dark:fill-white w-5 h-5"
               id="dashboard"
               />
            </Link>
         </li>
      </ul>
   </div>
   <div className="flex gap-2 items-center">
      <Search />
      <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
         <Link href="/profile/${data}">
         <SlEmotsmile
            className="stroke-[#5311BF] dark:stroke-white w-5 h-5"
            id="user"
            />
         </Link>
      </button>
      <ThemeSwitcher />
   </div>
</div>

{/* MOBILE */}
<div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white dark:bg-[#121212] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
   <ul className="flex gap-10 brand_purple justify-evenly w-full">
      <li>
         <Link className="flex flex-col items-center" href="/concerts">
         <SlGrid
            className="fill-[#5311BF] dark:fill-white w-5 h-5"
            id="explore"
            />
         <span className="text-[#5311BF] dark:text-white">Explore</span>
         </Link>
      </li>
      <li>
         <Link className="flex flex-col items-center" href="/favourites">
         <SlHeart
            className="text-[#5311BF] dark:text-white w-5 h-5"
            id="favourites"
            />
         <span className="text-[#5311BF] dark:text-white">Favourites</span>
         </Link>
      </li>
      <li>
         <Link 
            className="flex flex-col items-center" 
            href="/admin-dashboard">
         <SlLock
            className="fill-[#5311BF] dark:fill-white w-5 h-5"
            id="dashboard"
            />
         <span className="text-[#5311BF] dark:text-white">Admin</span>
         </Link>
      </li>
      <li>
         <Link
            className="flex flex-col items-center"
            href="/profile/${data}"
            >
         <SlEmotsmile
            className="fill-[#5311BF] dark:fill-white w-5 h-5"
            id="user"
            />
         <span className="text-[#5311BF] dark:text-white">Profile</span>
         </Link>
      </li>
   </ul>
</div>
</>
)
};
export default NavAdmin;