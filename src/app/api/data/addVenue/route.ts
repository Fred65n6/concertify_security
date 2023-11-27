// Import necessary modules and models
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// Define a type for the selectedVenues array
interface SelectedVenue {
  venue_name: string;
  venue_id: string;
}

// Define the API endpoint handler
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON payload
    const data = await request.json();
    const { selectedVenues,email } = data;

    // Find the user based on their email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    const venueObjects: SelectedVenue[] = selectedVenues.map(
      ({ venue_name, venue_id }: SelectedVenue) => ({
        venue_name,
        venue_id,
      })
    );

    user.venues.push(...venueObjects);

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding venues:", error);
    return NextResponse.json({
      success: false,
      error: "Error adding venues",
    });
  }
}
