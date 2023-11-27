"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {SlArrowRight, SlArrowLeft} from "react-icons/sl";

interface ArtistCard {
    _id: string;
    artist_name: string;
    artist_image: string;
    artist_concert: {
        concert_name: string;
        concert_image: string;
        concert_date: string;

    };
    artist_genre: {
        genre_id: string;
        genre_name: string;
    };
}

const ArtistCard: React.FC = () => {
    const [artists, setArtists] = useState<ArtistCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const artistsPerPage = 4;

    // ----- Fetch data with useEffect since it is a client site
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data/artistData");
                setArtists(response.data.data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchData();
    }, []);

    // ----- Calculate the start and end indexes of venues to display on the current page
    const startIndex = (currentPage - 1) * artistsPerPage;
    const endIndex = startIndex + artistsPerPage;

    // ----- Slice the venues array to display only the venues for the current page
    const artistsToDisplay = artists.slice(startIndex, endIndex);

    // ----- Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(artists.length / artistsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // ----- Function to handle previous page
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {artists?.map((artist) => (
                <article className="flex-shrink-0 grid pb-8" key={artist._id}>
                    <Link href={"/artists/" + artist._id} key={artist._id}>
                        <Image
                            src={"/" + artist.artist_image}
                            width={200}
                            height={200}
                            alt="concert"
                            className="rounded-lg  object-cover w-full h-[200px]"
                        />
                    </Link>

                    <h4 className="text-black text-xl font-bold dark:text-white">
                        {artist.artist_concert.concert_name
                            ? artist.artist_concert.concert_name
                            : "Unknown Artist Concert name"}{" "}
                        -{" "}
                        {artist.artist_name
                            ? artist.artist_name
                            : "Unknown artist_name"}
                    </h4>
                </article>
            ))}

            <div className="pagination hidden md:flex gap-8 md:place-self-end md:col-end-5">
                {currentPage > 1 && (
                    <button
                        onClick={previousPage}
                        className="pagination-button flex items-center"
                    >
                        <SlArrowLeft
                            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                            id="explore"
                        />
                        Previous
                    </button>
                )}
                <button
                    onClick={nextPage}
                    className={`flex items-center pagination-button ${
                        currentPage ===
                        Math.ceil(artists.length / artistsPerPage)
                            ? "disabled"
                            : ""
                    }`}
                >
                    Next
                    <SlArrowRight
                        className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
                        id="explore"
                    />
                </button>
            </div>
        </>
    );
};

export default ArtistCard;
