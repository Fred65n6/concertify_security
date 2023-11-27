import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Venue from "@/models/venueModel";
import AWS from "aws-sdk";

// Load AWS credentials and configuration from environment variables
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

const s3 = new AWS.S3();

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const venueName = data.get("Venue_name");
    const venueAddress = data.get("Venue_address");
    const venueLocation = data.get("Venue_location");
    const venueSize = data.get("Venue_size");
    const venueDescription = data.get("Venue_description");

    if (!file) {
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const s3BucketName = "concertify"; // Replace with your S3 bucket name
    const s3ObjectKey = `venue_images/${newFileName}`;

    const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
    };

    try {
        await s3.upload(params).promise();
        console.log(`File uploaded to S3: ${s3ObjectKey}`);

        const venueImage = `venue_images/${newFileName}`;

        const newVenue = new Venue({
            venue_name: venueName,
            venue_image: venueImage,
            venue_address: venueAddress,
            venue_location: venueLocation,
            venue_size: venueSize,
            venue_description: venueDescription,
        });

        const savedVenue = await newVenue.save();
        console.log(savedVenue);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        return NextResponse.json({success: false});
    }
}
