import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  favourite_user_id: {
    type: String,
    unique: false,
  },
  favourite_concert_id: {
    type: String,
  },
  favourite_concert_image: {
    type: String,
  },
  favourite_concert_name: {
    type: String,
  },
  favourite_concert_date: {
    type: String,
  },
  favourite_concert_venue: {
    type: String,
  },

  favourite_concert_artist: {
    type: String,
  },
});

const Favourite =
  mongoose.models.favourites || mongoose.model("favourites", favouriteSchema);

export default Favourite;
