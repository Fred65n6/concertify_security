"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "../search/page";
import {GrHomeRounded} from "react-icons/gr";
import {SlGrid, SlHome, SlUser, SlHeart} from "react-icons/sl";
import ThemeSwitcher from "../switchTheme/page";

const NavLogged = () => {
    const openLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.remove("hidden");
        loginModule?.classList.add("grid");
    };

    const openSignupModule = () => {
        const signupModule = document.getElementById("signup_module");
        signupModule?.classList.remove("hidden");
        signupModule?.classList.add("grid");
    };

    return (
        <nav className="">
            {/* DESKTOP */}
            <div className="hidden lg:flex max-w-[1300px] pt-8 px-8 justify-between items-center m-auto lg:px-14">
                <div className="flex gap-12 items-center w-fit">
                    <Link href="/">
                        <Image
                            src="../concertify_logo.svg"
                            width={150}
                            height={80}
                            alt="concertify_logo"
                        />
                    </Link>
                    <ul className="flex gap-10 brand_purple dark:text-purple-500">
                        <li>
                            <Link
                                className="flex gap-2 items-center"
                                href="/concerts"
                            >
                                <SlGrid
                                    className="fill-[#5311BF] dark:fill-purple-500 w-5 h-5"
                                    id="explore"
                                />
                                <span className="text-md text-[#5311BF] dark:text-purple-500">
                                    Explore
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <Search />
                    <button
                        type="button"
                        onClick={openSignupModule}
                        className="rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200 h-12"
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        onClick={openLoginModule}
                        className="rounded-full w-32 brand_gradient text-white hover:bg-purple-200 h-12"
                    >
                        Log in
                    </button>
                    <ThemeSwitcher />
                </div>
            </div>

             {/* TABLET NAV */}
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
                            className="fill-[#5311BF] dark:fill-purple-500 w-5 h-5"
                            id="explore"
                            />
                        </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                <Search />
                <button className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center gap-2 m-auto hover:bg-purple-200">
                    <Link href="/profile/${data}">Profile</Link>
                    <SlUser
                    className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                    id="user"
                    />
                </button>
                <ThemeSwitcher />
                </div>
            </div>

            {/* MOBILE NAV */}
            <div className="flex md:hidden p-4 fixed bottom-0 w-full bg-white">
                <ul className="flex gap-10 brand_purple justify-evenly w-full">
                    <li>
                        <Link className="flex flex-col items-center" href="/">
                            <SlHome
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                id="home"
                            />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex flex-col items-center"
                            href="/concerts"
                        >
                            <SlGrid
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                                id="explore"
                            />
                            Explore
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex flex-col items-center"
                            onClick={openLoginModule}
                        >
                            <SlUser
                                className="stroke-[#5311BF] dark:stroke-[#8e0bf5 w-5 h-5"
                                id="user"
                            />
                            Log in
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavLogged;
