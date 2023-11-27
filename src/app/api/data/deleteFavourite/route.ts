import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

export async function DELETE(request: NextRequest) {
    const data = await request.formData();
    const favouriteUserId = data.get("Favourite_user_id");
    const favouriteConcertId = data.get("Favourite_concert_id");

    if (!favouriteUserId || !favouriteConcertId) {
        return NextResponse.json(
            {success: false, error: "Missing required parameters"},
            {status: 400}
        );
    }

    try {
        // Assuming you have a Mongoose model for User
        const user = await User.findOne({_id: favouriteUserId});

        if (!user) {
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            );
        }

        // Find the index of the favorite with the specified concert ID
        const favoriteIndex = user.favourites.findIndex(
            (favourite: any) =>
                favourite.favourite_concert_id === favouriteConcertId
        );

        if (favoriteIndex === -1) {
            return NextResponse.json(
                {success: false, error: "Favorite not found"},
                {status: 404}
            );
        }

        // Remove the favorite from the array
        user.favourites.splice(favoriteIndex, 1);
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Favorite deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Error deleting favorite"},
            {status: 500}
        );
    }
}
