"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  _id: string;
  artist_name: string;
  // Add other properties from your Venue model
}

const ArtistList: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/artistData"); // Replace with your actual API endpoint
        setArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <ul className="flex gap-8">
        {artists.map((artist) => (
          <li className="grid gap-2" key={artist._id}>
            <div className="">{artist.artist_name}</div>
          </li>

          // Add other properties from your Venue model as needed
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
