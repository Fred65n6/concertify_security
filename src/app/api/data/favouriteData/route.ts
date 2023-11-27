import { NextRequest, NextResponse } from "next/server";
import Favourite from "@/models/favouriteModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const favourite = await Favourite.find();

    return NextResponse.json({
      message: "Favourite Found:",
      data: favourite,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
