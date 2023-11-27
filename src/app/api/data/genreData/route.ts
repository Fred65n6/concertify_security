import {NextRequest, NextResponse} from "next/server";
import Genre from "@/models/genreModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const genre = await Genre.find();

        return NextResponse.json({
            message: "Genres Found:",
            data: genre,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
