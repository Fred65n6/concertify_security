import {NextRequest, NextResponse} from "next/server";
import Venue from "@/models/venueModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const venue = await Venue.find();

        return NextResponse.json({
            message: "Venue Found:",
            data: venue,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
