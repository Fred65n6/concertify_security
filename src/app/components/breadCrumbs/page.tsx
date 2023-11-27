"use client";
import React, {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";

const BreadcrumbComp = () => {
    const [config] = useState({
        homeElement: "Home",
        separator: <SlArrowLeft className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1" id="arrow_back"/>,
        containerClasses: "",
        listClasses: "",
        activeClasses: "active",
        capitalizeLinks: true,
    });

    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);

    return (
        <div className="flex mt-4 mb-12">
            <ul className="flex items-center gap-2 brand_purple dark:text-purple-300 opacity-60">
                <li className="hover:underline">
                    <Link href={"/"}>{config.homeElement}</Link>
                </li>
                {pathNames.length > 0 && config.separator}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    let isActive = paths === href;
                    let itemLink = config.capitalizeLinks
                        ? link[0].toUpperCase() + link.slice(1, link.length)
                        : link;
                    return (
                        <React.Fragment key={index}>
                            <li
                                className={
                                    isActive
                                        ? `active-breadcrumb ${config.activeClasses}`
                                        : config.listClasses
                                }
                            >
                                <Link className="hover:underline" href={href}>
                                    {itemLink}
                                </Link>
                            </li>
                            {pathNames.length !== index + 1 && config.separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default BreadcrumbComp;
