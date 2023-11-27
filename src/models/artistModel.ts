import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        unique: true,
        required: [true, "please provide the artist_name"],
    },
    artist_genre: {
        genre_name: String,
        genre_id: String,
    },
    artist_image: {
        type: String,
    },
    artist_nation: {
        type: String,
    },
    artist_full_name: {
        type: String,
    },
    artist_dob: {
        type: String,
    },
});

const Artist =
    mongoose.models.artists || mongoose.model("artists", artistSchema);

export default Artist;
