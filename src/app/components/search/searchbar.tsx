"use client";
import React, {useState, useEffect, ChangeEvent} from "react";
import {FaSearch} from "react-icons/fa";
import { isNull } from "util";


interface SearchInputProps {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchBar: React.FC<SearchInputProps> = ({setResults}) => {
    const [input, setInput] = useState<string>("");

    const fetchData = (value: string) => {
        const apiUrl = "/api/data/artistData";

        fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {
                const results = json.data.filter((artist: any) => {
                    return (
                        value &&
                        artist &&
                        artist.artist_name &&
                        artist.artist_name.toLowerCase().includes(value)
                    );
                });
                setResults(results);
                console.log(results);
            });
    };

    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="bg-slate-100 p-2 rounded-full m-4 w-72">
            <div className="flex gap-2 items-center mx-2">
                <FaSearch className="fill-slate-400" id="search-icon" />
                <input
                    type="textarea"
                    className="bg-slate-100 outline-none dark:text-black"
                    placeholder="Search artists..."
                    value={input}
                    // onBlur={() => setInput("")}
                    onBlur={() => handleChange("")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value)
                    }
                />
            </div>
        </div>
    );
};
