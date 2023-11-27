import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const favouriteConcertId = data.get("Favourite_concert_id");
    const favouriteConcertImage = data.get("Favourite_concert_image");
    const favouriteConcertName = data.get("Favourite_concert_name");
    const favouriteConcertVenue = data.get("Favourite_concert_venue");
    const favouriteConcertDate = data.get("Favourite_concert_date");
    const favouriteConcertArtist = data.get("Favourite_concert_artist");
    const favouriteUserId = data.get("Favourite_user_id");

    try {
        // Find the user based on their ID
        const user = await User.findOne({_id: favouriteUserId});

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found",
            });
        }

        // Create a new favorite object
        const newFavorite = {
            favourite_concert_id: favouriteConcertId,
            favourite_concert_image: favouriteConcertImage,
            favourite_concert_name: favouriteConcertName,
            favourite_concert_date: favouriteConcertDate,
            favourite_concert_artist: favouriteConcertArtist,
            favourite_concert_venue: favouriteConcertVenue,
        };

        // Add the new favorite to the user's favorites array
        user.favourites.push(newFavorite);

        // Save the updated user document
        await user.save();

        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Error adding favorite",
        });
    }
}
