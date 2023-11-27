"use client";
import {useState, useEffect} from "react";
import {SearchBar} from "./searchbar";
import { SearchResultsList } from "./searchResultsList";


function Search() {

    const [results, setResults] = useState([]);

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar setResults={setResults}  />
                {results && results.length > 0 && (
                    <SearchResultsList results={results} />
                )}
            </div>
        </div>
    );
}

export default Search;
