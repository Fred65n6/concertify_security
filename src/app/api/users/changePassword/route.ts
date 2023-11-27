import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();


function validatePassword(password:string) {
    // Password must contain at least one uppercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
}


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newpassword, email, password, confirmpassword} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            );
        }

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        // Validate password
        if (!validatePassword(password)) {
            return NextResponse.json(
                { error: "Password must include one uppercase letter, one digit, one special character and be at least 9 characters long" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, salt);

        if (newpassword !== confirmpassword) {
            throw new Error("New password and confirm password do not match");
        }

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "New password set",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
