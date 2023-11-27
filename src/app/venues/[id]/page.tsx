"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
// import {StringSchemaDefinition} from "mongoose";
import VenueCard from "@/app/components/venueCard/page";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";
import BreadcrumbComp from "@/app/components/breadCrumbs/page";

import {
  SlLocationPin,
  SlHeart,
  SlCalender,
  SlSocialInstagram,
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialYoutube,
  SlUserFollowing,
} from "react-icons/sl";

interface VenueSingle {
  _id: string;
  venue_name: string;
  venue_address: string;
  venue_size: string;
  venue_location: string;
  venue_description: string;
  venue_image: string;
}

export default function SingleVenue() {
  const params = useParams();
  const id = params.id;
  const [venues, setVenues] = useState<VenueSingle[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<VenueSingle | null>(null);

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

  // Use a useEffect to update the selectedVenue when the 'id' or 'venues' array changes
  useEffect(() => {
    if (id && venues.length > 0) {
      const matchingVenue = venues.find((venue) => venue._id === id);
      setSelectedVenue(matchingVenue || null);
    } else {
      setSelectedVenue(null);
    }
  }, [id, venues]);

  return (
    <div className="pt-8">
      <LoginPage />
      <SignupPage />
      <BreadcrumbComp />
      {selectedVenue ? (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-12 w-full">
          <figure>
            <Image
              src={`https://concertify.s3.eu-central-1.amazonaws.com/${selectedVenue.venue_image}`}
              width={200}
              height={200}
              alt="concert"
              className="h-full object-cover w-full rounded-lg"
            />
          </figure>
          <section>
            <div className="flex justify-between">
              <div className="">
                <h1 className="text-3xl font-bold p-2">
                  {selectedVenue.venue_name}
                </h1>
              </div>
              <div>
                <button className="flex items-center place-content-center rounded-full bg-purple-100 brand_purple w-32 py-3 hover:bg-purple-200">
                  <SlHeart
                    className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                    id="favourites"
                  />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <ul className="flex flex-col gap-4 pt-4">
              {/* Location */}
              <li className="flex gap-2">
                <SlLocationPin
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                  id="favourites"
                />
                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                  {selectedVenue.venue_address}, {selectedVenue.venue_location}
                </p>
              </li>
              {/* Venue Size */}
              <li className="flex gap-2">
                <SlUserFollowing
                  className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5"
                  id="venue_size"
                />
                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                  {selectedVenue.venue_size}
                </p>
              </li>
              {/* Todays program */}
              <li className="flex gap-2">
                <SlCalender
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="date"
                />
                <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                  What is on today?
                </p>
                <hr />
                {/* her skal der fetches data om hvilke koncerter, der spiller */}
              </li>
            </ul>
            <div className="border-t-[1px] border-[#979C9E] pt-4 mt-4">
              <p className="text-gray-600 text-sm dark:text-gray-400 align-middle">
                {selectedVenue.venue_description}
              </p>
              <div className="flex pt-5 gap-4">
                <SlSocialInstagram
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="instagram"
                />
                <SlSocialTwitter
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="twitter"
                />
                <SlSocialFacebook
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="facebook"
                />
                <SlSocialYoutube
                  className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                  id="youtube"
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Event schedule section */}
      {selectedVenue ? (
        <section className="pb-12">
          <h2 className="text-2xl font-bold">
            Event Schedule at {selectedVenue.venue_name}
          </h2>
          <div></div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
      {/* Other venues section */}
      {selectedVenue ? (
        <section className="">
          <h2 className="text-2xl font-bold">
            Other venues you need to experience
          </h2>
          <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
            <VenueCard />
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
