import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newUsername, email} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        const usernameExists = await User.findOne({newUsername});
        if (usernameExists) {
            return NextResponse.json(
                {error: "Username is already taken"},
                {status: 400}
            );
        }

        user.username = newUsername;
        await user.save();

        return NextResponse.json({
            message: "New Username set",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
