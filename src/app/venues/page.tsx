"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbComp from "../components/breadCrumbs/page";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
interface Venue {
    _id: string;
    venue_name: string;
    venue_address: string;
    venue_image: string;
    venue_location: string;
    // Add other properties from your Venue model
}

const VenueList: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);

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

    return (
        <>
            <BreadcrumbComp />
            <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 pb-40 pt-10">
                {venues.map((venue) => (
                    <article className="w-auto" key={venue._id}>
                        <Link href={"/venues/" + venue._id} key={venue._id}>
                            <Image
                                src={`https://concertify.s3.eu-central-1.amazonaws.com/${venue.venue_image}`}
                                width={200}
                                height={200}
                                alt="concert"
                                className="rounded-lg object-cover w-[300px] h-[200px]"
                            />
                        </Link>

                        <div className="text-black text-xl font-bold dark:text-white pt-2">
                            {venue.venue_name}
                        </div>
                        <div className="text-gray-600 text-sm dark:text-gray-400 pt-2">
                            {venue.venue_address}
                        </div>
                        <div className="text-gray-400 text-sm dark:text-gray-400">
                            {venue.venue_location}
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default VenueList;
