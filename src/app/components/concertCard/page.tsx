"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

interface ConcertCard {
  _id: string;
  concert_artist: {
    artist_id: string;
    artist_name: string;
    artist_instagram: string;
    artist_youtube: string;
    artist_facebook: string;
    artist_twitter: string;
    artist_spotify: string;
  };
  concert_date: string;
  concert_description: string;
  concert_image: string;
  concert_name: string;
  concert_start: string;
  concert_genre: {
    genre_id: string;
    genre_name: string;
  };
  concert_venue: {
    venue_id: string;
    venue_name: string;
    venue_address: string;
    venue_location: string;
  };
  concert_doors: string;
}

const ConcertCard: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertCard[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const concertsPerPage = 4;

  // ----- Fetch data with useEffect since it is a client site
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/concertData");
        setConcerts(response.data.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchData();
  }, []);

  // ----- Calculate the start and end indexes of venues to display on the current page
  const startIndex = (currentPage - 1) * concertsPerPage;
  const endIndex = startIndex + concertsPerPage;

  // ----- Slice the venues array to display only the venues for the current page
  const concertsToDisplay = concerts.slice(startIndex, endIndex);

  return (
    <>
      {concertsToDisplay?.map((concert) => (
        <article className="flex-shrink-0 grid pb-8" key={concert._id}>
          <Link href={"/concerts/" + concert._id} key={concert._id}>
            <Image
              src={`https://concertify.s3.eu-central-1.amazonaws.com/${concert.concert_image}`}
              width={200}
              height={200}
              alt="concert"
              className="rounded-lg object-cover w-full h-[200px]"
            />
          </Link>

          <h4 className="text-black text-xl font-bold dark:text-white pt-2">
            {concert.concert_artist
              ? concert.concert_artist.artist_name
              : "Unknown Artist"}{" "}
            -{" "}
            {concert.concert_name
              ? concert.concert_name
              : "Unknown concert_name"}
          </h4>

          <p className="text-black text-sm dark:text-gray-100">
            <span>
              {concert.concert_venue?.venue_name},{" "}
            </span>
            {concert.concert_date}
          </p>
        </article>
      ))}
    </>
  );
};

export default ConcertCard;
