import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    // Check if the user is verified
    if (!user.isVerified) {
      console.log("user not verified");
      return NextResponse.json(
        { error: "Email is not verified" },
        { status: 400 }
      );
    }

    // ADMIN STUFF
    // Check if the user is an admin
    if (user.isAdmin) {
      // This user is an admin; you can handle admin-specific tasks here
      const tokenDataAdmin = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: true, // You can include the admin flag in the token data
      };

      // Create and set the token as before
      const adminToken = await jwt.sign(tokenDataAdmin, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Admin login successful",
        success: true,
        isAdmin: true,
      });

      response.cookies.set("adminToken", adminToken, {
        httpOnly: false,
      });

      return response;
    }

    // ADMIN STUFF END
    else {
      //create token data
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: false,
      };

      //create token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });

      response.cookies.set("token", token, {
        httpOnly: false,
      });
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
