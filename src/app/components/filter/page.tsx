"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { SlLocationPin, SlCalender, SlStar, SlMusicToneAlt } from "react-icons/sl";


const Filter: React.FC<any> = ({data, onDataFiltered}) => {
    const [dateFilter, setDateFilter] = useState<string>("");
    const [artistFilter, setArtistFilter] = useState<string>("");
    const [venueFilter, setVenueFilter] = useState<string>("");
    const [genreFilter, setGenreFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<any[]>(data); // Initialize with the original data
    const [venues, setVenues] = useState<string[]>([]); // State for venue names
    const [genres, setGenres] = useState<string[]>([]); // State for venue names

    // Fetch venues from the API
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get("/api/data/venueData"); // Replace with your actual API endpoint
                const venueData = response.data.data;
                const venueNames = venueData.map(
                    (venue: any) => venue.venue_name
                );
                setVenues(venueNames);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };

        fetchVenues();
    }, []);

    // Fetch genres from the API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("/api/data/genreData"); // Replace with your actual API endpoint
                const genreData = response.data.data;
                const genreNames = genreData.map(
                    (genre: any) => genre.genre_name
                );
                setGenres(genreNames);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        // Filter data based on artist, venue, and date filters
        const newFilteredData = data.filter((item: any) => {
            const artistName = item.concert_artist.artist_name.toLowerCase();
            const venueName = item.concert_venue.venue_name.toLowerCase();
            const genreName = item.concert_genre.genre_name.toLowerCase();
            const concertDate = new Date(item.concert_date)
                .toISOString()
                .substr(0, 10)
                .toLowerCase();

            return (
                artistName.includes(artistFilter.toLowerCase()) &&
                venueName.includes(venueFilter.toLowerCase()) &&
                genreName.includes(genreFilter.toLowerCase()) &&
                concertDate.includes(dateFilter.toLowerCase())
            );
        });

        // Update the filtered data and call the callback if it's different
        if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
            setFilteredData(newFilteredData);
            onDataFiltered(newFilteredData);
        }
    }, [
        artistFilter,
        venueFilter,
        dateFilter,
        genreFilter,
        data,
        onDataFiltered,
    ]);

    return (
        // <div className="border-[1px] lg:rounded-full rounded-2xl lg:my-8 border-solid border-purple-800 grid grid-cols-2 lg:flex lg:py-6 p-4 lg:px-12 justify-between">
        <div className="grid grid-cols-1 lg:flex lg:py-6 p-4 lg:px-0 justify-between gap-4">
            <div className="pb-4 md:pb-0 w-full md:w-1/4">
                <label
                    className=" flex gap-2 mb-4 mt-0 items-center w-fit text-sm md:text-lg text-[#5311BF] dark:text-white"
                    htmlFor="venue"
                >
                    <SlLocationPin/>
                    Venue
                </label>
                <select
                    className="border-[1px] rounded-full border-solid border-[#5311BF] px-8 py-4 w-full dark:text-black dark:border-0"
                    name="venue"
                    value={venueFilter}
                    onChange={(e) => setVenueFilter(e.target.value)}
                >
                    <option className="border-none t-2 " value="">
                        Select
                    </option>
                    {venues.map((venue) => (
                        <option
                            className="border-none"
                            key={venue}
                            value={venue}
                        >
                            {venue}
                        </option>
                    ))}
                </select>
            </div>

            <div className="pb-4 md:pb-0 w-full md:w-1/4">
                <label
                    className=" flex gap-2 mb-4 mt-0 items-center w-fit text-sm md:text-lg text-[#5311BF] dark:text-white"
                    htmlFor="date"
                >
                    <SlCalender/>
                    Date
                </label>
                <input
                    name="date"
                    type="date"
                    placeholder="Filter by date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border-[1px] rounded-full border-solid border-[#5311BF] px-8 py-4 w-full dark:text-black dark:border-0"
                />
            </div>

            <div className="pb-4 md:pb-0 w-full md:w-1/4">
                <label
                    className=" flex gap-2 mb-4 mt-0 items-center w-fit text-sm md:text-lg text-[#5311BF] dark:text-white"
                    htmlFor="genre"
                >
                    <SlMusicToneAlt/>
                    Genre
                </label>
                <select
                    className="border-[1px] rounded-full border-solid border-[#5311BF] px-8 py-4 w-full dark:text-black dark:border-0"
                    name="genre"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                >
                    <option value="">Select</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="pb-4 md:pb-0 w-full md:w-1/4">
                <label
                    className=" flex gap-2 mb-4 mt-0 items-center w-fit text-sm md:text-lg text-[#5311BF] dark:text-white"
                    htmlFor="artist"
                >
                    <SlStar/>
                    Artists
                </label>

                <input
                    name="artist"
                    type="text"
                    className="border-[1px] rounded-full border-solid border-[#5311BF] px-8 py-4 w-full dark:text-black dark:border-0"
                    placeholder="Type to search..."
                    value={artistFilter}
                    onChange={(e) => setArtistFilter(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filter;
