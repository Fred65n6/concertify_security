import React from "react";
import Image from "next/image";
import {SlPhone, SlEnvolope, SlLocationPin} from "react-icons/sl";

const Footer = () => {
    return (
        <>
            <footer className=" hidden md:block pb-24 md:pb-12 font-light w-full px-4 xl:px-28 border-t-[1px] border-slate-200 pt-8">
                <div className="grid grid-cols-2 pt-4 py-12">
                    <Image
                        src="../concertify_logo.svg"
                        width={150}
                        height={30}
                        className="py-5"
                        alt="logo"
                    />
                    <div>
                        <p className="col-start-1 col-span-2 md:col-span-1 text-left pb-10 pt-4 text-gray-600 dark:text-slate-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sapiente eos soluta exercitationem accusantium
                            nostrum cum voluptates.
                        </p>
                        <div className="flex flex-col md:flex gap-8 pb-8">
                            <div className="text-gray-600 dark:text-slate-400 flex gap-2 align-middle">
                                <SlPhone className="w-5 h-5" id="phone" />
                                <a href="tel:004528513171">310-437-2766</a>
                            </div>
                            <div className="text-gray-600 dark:text-slate-400  flex gap-2 align-baseline">
                                <SlEnvolope
                                    className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                                    id="mail"
                                />
                                <a href="mailto:help@concertify.com">
                                    help@concertify.com
                                </a>
                            </div>
                            <div className="text-gray-600 dark:text-slate-400  flex gap-2 align-middle">
                                <SlLocationPin
                                    className=" w-5 h-5"
                                    id="location"
                                />
                                <p>
                                    Meinungsgade 29, Nørrebro, Copenhagen
                                    Denmark
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="flex border-t border-[#D0D5DD] justify-between pt-8">
                    <div className="grid md:flex gap-4 text-gray-600 dark:text-slate-400 ">
                        <a href="#">About us</a>
                        <a href="#">Contact</a>
                        <a href="#">Account</a>
                        <a href="#">Privacy policy</a>
                        <a href="#">Terms of use</a>
                    </div>
                    <div>
                        <p className="text-gray-600 dark:text-slate-400 ">
                            @ 2023, All Rights Reserved
                        </p>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;
