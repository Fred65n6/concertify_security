import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Artist from "@/models/artistModel";
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
    const artistName = data.get("artist_name");
    const artistFullName = data.get("artist_full_name");
    const artistNationality = data.get("artist_nation");
    const artistDescription = data.get("artist_description");
    const artistDob = data.get("artist_dob");

    const artistGenre = {
        genre_name: data.get("artist_genre_name"),
        genre_id: data.get("artist_genre_id"),
    };

    if (!file) {
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const s3BucketName = "concertify"; // Replace with your S3 bucket name
    const s3ObjectKey = `artist_images/${newFileName}`;

    const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
    };

    try {
        await s3.upload(params).promise();
        console.log(`File uploaded to S3: ${s3ObjectKey}`);

        const artistImage = `artist_images/${newFileName}`;

        const newArtist = new Artist({
            artist_name: artistName,
            artist_full_name: artistFullName,
            artist_description: artistDescription,
            artist_nation: artistNationality,
            artist_image: artistImage,
            artist_genre: artistGenre,
            artist_dob: artistDob,
        });

        const savedArtist = await newArtist.save();
        console.log(savedArtist);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        return NextResponse.json({success: false});
    }
}
