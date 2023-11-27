import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect();

function validatePassword(password:string) {
    // Password must contain at least one uppercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, confirmpassword } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return NextResponse.json(
                { error: "Username is already taken" },
                { status: 400 }
            );
        }

        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return NextResponse.json(
                { error: "Password and confirm password doesn't match" },
                { status: 400 }
            );
        }

        // Validate password
        if (!validatePassword(password)) {
            return NextResponse.json(
                { error: "Password must include one uppercase letter, one digit, one special character and be at least 9 characters long" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        // Sign up success
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}