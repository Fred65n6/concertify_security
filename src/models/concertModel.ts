import {time} from "console";
import {url} from "inspector";
import mongoose from "mongoose";

const concertSchema = new mongoose.Schema({
    concert_name: {
        type: String,
        unique: false,
    },
    concert_artist: {
        artist_id: String,
        artist_name: String,
        artist_instagram: String,
        artist_youtube: String,
        artist_facebook: String,
        artist_twitter: String,
        artist_spotify: String,
    },
    concert_date: {
        type: String,
    },
    concert_description: {
        type: String,
    },
    concert_start: {
        type: String,
    },
    concert_image: {
        type: String,
    },
    concert_genre: {
        genre_name: String, // Add a property for the genre name
        genre_id: String, // Add a property for the genre description
    },
    concert_venue: {
        venue_id: String,
        venue_name: String,
        venue_location: String,
    },
    concert_doors: {
        type: String,
    },
});

const Concert =
    mongoose.models.concerts || mongoose.model("concerts", concertSchema);

export default Concert;
