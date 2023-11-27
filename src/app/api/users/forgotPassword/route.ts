import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest): Promise<void | Response> {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email});

        if (user) {
            // Send verification email only if the user exists
            await sendEmail({email, emailType: "RESET", userId: user._id});
            console.log(user.user_id);
            return NextResponse.json({
                message: "Email sent",
                success: true,
                userId: user.id,
            });
        }

        // Add a default response if the user does not exist
        return NextResponse.json({message: "User not found", success: false});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}
