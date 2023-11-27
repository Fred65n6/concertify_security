"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Venue {
  _id: string;
  venue_name: string;
  venue_address: string;
  venue_image: string;
  venue_location: string;
}

const VenueCard: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();
  const id = params.id;
  const venuesPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/venueData");
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  // Filter venues to exclude the one with the matching ID
  const filteredVenues = venues.filter((venue) => venue._id !== id);

  // Calculate the start and end indexes of venues to display on the current page
  const startIndex = (currentPage - 1) * venuesPerPage;
  const endIndex = startIndex + venuesPerPage;

  // Slice the filtered venues array to display only the venues for the current page
  const venuesToDisplay = filteredVenues.slice(startIndex, endIndex);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredVenues.length / venuesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {venuesToDisplay.map((venue) => (
        <article className="flex-shrink-0 md:pt-8 pb-8" key={venue._id}>
          <Link href={"/venues/" + venue._id} key={venue._id}>
            <Image
              src={`https://concertify.s3.eu-central-1.amazonaws.com/${venue.venue_image}`}
              width={200}
              height={200}
              alt="concert"
              className="rounded-lg  object-cover w-[300px] h-[200px]"
            />
          </Link>

          <div className="text-black text-xl font-bold dark:text-white pt-2">
            {venue.venue_name}
          </div>
          <p className="text-black text-sm dark:text-gray-100">
            <span className="mr-1">{venue.venue_address}, </span>
            {venue.venue_location}
          </p>
        </article>
      ))}

      <div className="hidden pagination md:flex gap-8 md:place-self-end md:col-end-5">
        {currentPage > 1 && (
          <button
            onClick={previousPage}
            className="pagination-button flex items-center"
          >
            <SlArrowLeft
              className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
              id="arrow_left"
            />
            Previous
          </button>
        )}
        <button
          onClick={nextPage}
          className={`flex items-center pagination-button ${
            currentPage === Math.ceil(filteredVenues.length / venuesPerPage)
              ? "disabled"
              : ""
          }`}
        >
          Next
          <SlArrowRight
            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4"
            id="arrow_right"
          />
        </button>
      </div>
    </>
  );
};

export default VenueCard;
