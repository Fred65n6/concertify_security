import { useState } from "react";
import { SearchResult } from "@/app/components/search/searchResults";
import Link from "next/link";

export const SearchResultsList = ({ results}) => {
  const handleLinkClick = () => {
    window.location.reload()
  };

  return (
    <div className="absolute pl-4 w-72 h-52 overflow-scroll">
      {results.map((result, id) => (
        <Link onClick={handleLinkClick} key={result._id} href={"/artists/" + result._id}>
          <SearchResult
            result={result.artist_name}
            key={id}
          />
        </Link>
      ))}
    </div>
  );
};