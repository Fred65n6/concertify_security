import {NextRequest, NextResponse} from "next/server";
import Concert from "@/models/concertModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const concert = await Concert.find();
        
        return NextResponse.json({
            message: "Concert Found:",
            data: concert,
            
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

