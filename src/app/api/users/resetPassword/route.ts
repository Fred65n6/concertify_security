import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

function validatePassword(newPassword:string) {
    // Password must contain at least one uppercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(newPassword);
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newPassword, token} = reqBody;

        // Find the user by the resetPasswordToken
        const user = await User.findOne({forgotPasswordToken: token});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        // Validate password
        if (!validatePassword(newPassword)) {
            return NextResponse.json(
                { error: "Password must include one uppercase letter, one digit, one special character and be at least 9 characters long" },
                { status: 400 }
            );
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);

        // Update the user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully!",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
