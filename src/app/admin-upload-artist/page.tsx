"use client";
import React, {useState, useEffect} from "react";
import {request} from "http";
import Link from "../../../node_modules/next/link";
import { SlArrowLeft } from "react-icons/sl";

interface Genre {
    _id: string;
    genre_name: string;
}

const UploadForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [artistName, setArtistName] = useState("");
    const [artistFullName, setArtistFullName] = useState("");
    const [artistNation, setArtistNation] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [artistDob, setArtistDob] = useState("");

    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [artistGenreId, setArtistGenreId] = useState("");
    const [artistGenreName, setArtistGenreName] = useState("");

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("/api/data/genreData");
                if (response.ok) {
                    const data = await response.json();
                    setGenres(data.data as Genre[]);
                }
            } catch (error) {
                console.error("Error fetching genres: ", error);
            }
        };

        fetchGenres();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return request;
        setLoading(true);

        const data = new FormData();
        data.set("file", file);
        data.set("artist_name", artistName);
        data.set("artist_full_name", artistFullName);
        data.set("artist_description", artistDescription);
        data.set("artist_dob", artistDob);
        data.set("artist_nation", artistNation);
        data.set("artist_genre_id", selectedGenre!._id);
        data.set("artist_genre_name", selectedGenre!.genre_name);

        const res = await fetch("/api/data/uploadArtist/", {
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
        const artistUploadedMessage = document.getElementById(
            "artistUploadedMessage"
        );
        const uploadArtistForm = document.getElementById("uploadArtistForm");
        artistUploadedMessage?.classList.remove("hidden");
        artistUploadedMessage?.classList.add("grid");
        uploadArtistForm?.classList.add("hidden");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-6 mb-24">
            <Link
                className="flex align-middle gap-2"
                href="/admin-artists"
            >
            <SlArrowLeft
                className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
                id="arrow_right"
                />
                Back to artists overview
            </Link>
            <h1 className="font-bold text-4xl pb-4">Upload an artist</h1>
            <form
                id="uploadArtistForm"
                className="flex flex-col gap-8 w-full"
                onSubmit={onSubmit}
            >
                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_name">Artist name</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_name"
                        name="artist_name"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Artist name"
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Full name</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_full_name"
                        name="artist_full_name"
                        value={artistFullName}
                        onChange={(e) => setArtistFullName(e.target.value)}
                        placeholder="Full name"
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_description">Description</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        id="artist_description"
                        name="artist_description"
                        value={artistDescription}
                        onChange={(e) => setArtistDescription(e.target.value)}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_full_name">Date of birth</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="date"
                        id="artist_dob"
                        name="artist_dob"
                        value={artistDob}
                        onChange={(e) => setArtistDob(e.target.value)}
                        placeholder="Date of birth"
                    />
                </div>

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_genre">Genre</label>
                    <select
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        value={selectedGenre ? selectedGenre._id : ""}
                        onChange={(e) =>
                            setSelectedGenre(
                                genres.find(
                                    (genre) => genre._id === e.target.value
                                ) || null
                            )
                        }
                    >
                        <option value="">Select a genre</option>
                        {genres.map((genre) => (
                            <option key={genre._id} value={genre._id}>
                                {genre.genre_name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    readOnly={true}
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full hidden"
                    type="text"
                    name="artist_genre_name"
                    value={selectedGenre ? selectedGenre.genre_name : ""}
                    onChange={(e) => setArtistGenreName(e.target.value)}
                    placeholder="artist genre name"
                />

                <input
                    readOnly={true}
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full hidden"
                    type="text"
                    name="Concert_genre_id"
                    value={selectedGenre ? selectedGenre._id : ""}
                    onChange={(e) => setArtistGenreId(e.target.value)}
                    placeholder="artist genre name"
                />

                <div className="form-group flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                    <label htmlFor="artist_nation">Artist nationality</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                        type="text"
                        name="artist_nation"
                        value={artistNation}
                        onChange={(e) => setArtistNation(e.target.value)}
                        placeholder="Two letter abbrivation (e.g. UK)"
                    />
                </div>

                <div className="form-group flex flex-col gap-2">
                    <label htmlFor="file">Upload image</label>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button
                    className="brand_gradient px-4 py-2 cursor-pointer text-white rounded-full w-72"
                    type="submit"
                    value="upload"
                >
                    {loading ? "Processing" : "Confirm"}
                </button>
            </form>
            <div id="artistUploadedMessage" className="hidden">
                <h2 className="text-2xl">Artist uploaded successfully 🎉</h2>
                <div className="flex gap-4 mt-8">
                    <a
                        className="brand_gradient py-2 px-4 text-white rounded-full"
                        href="/admin-upload-artist"
                    >
                        Upload another
                    </a>
                    <a
                        className="rounded-full px-8 py-2 bg-purple-100 brand_purple flex items-center hover:bg-purple-200"
                        href="/artists"
                    >
                        See all artists
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;
