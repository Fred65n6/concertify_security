"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbComp from "../components/breadCrumbs/page";

const FavouriteList: React.FC = () => {
    const [favourites, setFavourites] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/cookieUser");
                if (response.data.data && response.data.data.favourites) {
                    setFavourites(response.data.data.favourites);
                } else {
                    console.log("No favourites found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="pb-12">
            <BreadcrumbComp />
            <div>
                <h1 className="font-bold text-4xl pb-8 pt-8">Favourites</h1>
                <ul className="grid md:grid-cols-4 gap-8">
                    {favourites.map((favourite: any) => (
                        <article
                            className="w-auto"
                            key={favourite.favourite_concert_id}
                        >
                            <Link
                                href={
                                    "/concerts/" +
                                    favourite.favourite_concert_id
                                }
                            >
                                <Image
                                    src={`https://concertify.s3.eu-central-1.amazonaws.com/${favourite.favourite_concert_image}`}
                                    width={200}
                                    height={200}
                                    alt="favourite"
                                    className="rounded-lg object-cover w-full h-[200px]"
                                />
                            </Link>
                            <div className="flex justify-between items-center pt-2">
                                <h4 className="text-black text-xl font-bold dark:text-white">
                                    {favourite.favourite_concert_artist
                                        ? favourite.favourite_concert_artist
                                        : "Unknown Artist"}{" "}
                                    -{" "}
                                    {favourite.favourite_concert_name
                                        ? favourite.favourite_concert_name
                                        : "Unknown concert_name"}
                                </h4>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-400">
                                <span className="font-bold mr-1">
                                    {favourite.favourite_concert_venue}:
                                </span>
                                {favourite.favourite_concert_date}
                            </p>
                        </article>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FavouriteList;
