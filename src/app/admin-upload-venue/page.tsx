"use client";
import React, {useState} from "react";
import { SlArrowLeft } from "react-icons/sl";
import Link from "../../../node_modules/next/link";


const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [venueSize, setVenueSize] = useState("");
    const [venueLocation, setVenueLocation] = useState("");
    const [venueDescription, setVenueDescription] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.set("file", file);
        data.set("Venue_name", venueName);
        data.set("Venue_address", venueAddress);
        data.set("Venue_size", venueSize);
        data.set("Venue_location ", venueLocation);
        data.set("Venue_description", venueDescription);

        const res = await fetch("/api/data/uploadVenue/", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
        }

        if (res.ok) {
            setLoading(false);
            showUploadMessage();
        }
    };

    const showUploadMessage = () => {
        const venueUploadedMessage = document.getElementById(
            "venueUploadedMessage"
        );
        const uploadVenueForm = document.getElementById("uploadVenueForm");
        venueUploadedMessage?.classList.remove("hidden");
        venueUploadedMessage?.classList.add("grid");
        uploadVenueForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-6 mb-24">
            <Link
                className="flex align-middle gap-2"
                href="/admin-venues"
            >
            <SlArrowLeft
                className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
                id="arrow_right"
                />
                Back to venues overview
            </Link>
            <h1 className="font-bold text-4xl pb-4">Upload a venue</h1>
            <form
                id="uploadVenueForm"
                className="flex flex-col gap-8 w-full"
                onSubmit={onSubmit}
            >
                <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    name="Venue_name"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Venue name"
                />

                <input
                     className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    name="Venue_address"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Address"
                />
                <input
                     className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    name="Venue_location"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    placeholder="Location (e.g. Copenhagen V)"
                />
                <input
                     className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    name="Venue_size"
                    value={venueSize}
                    onChange={(e) => setVenueSize(e.target.value)}
                    placeholder="Size (measured in people)"
                />
                <input
                     className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    name="Venue_description"
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    placeholder="Venue description"
                />

                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                    className="brand_gradient px-4 py-2 cursor-pointer text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Confirm"}
                </button>
            </form>

            <div id="venueUploadedMessage" className="hidden">
                <h2 className="text-2xl">Venue uploaded successfully 🎉</h2>
                <div className="flex gap-4 mt-8">
                    <a
                        className="brand_gradient py-2 px-4 text-white rounded-full"
                        href="/admin-upload-venue"
                    >
                        Upload another
                    </a>
                    <a
                        className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center hover:bg-purple-200"
                        href="/venues"
                    >
                        See all venues
                    </a>
                </div>
            </div>



        </div>
    );
};

export default UploadForm;
