import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const resetToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: resetToken,
                Something: "this item",
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            service: "gmail", // Use Gmail service
            auth: {
                user: "frederikmilland95@gmail.com", // Your Gmail email address
                pass: "mwvynzigocxzoehf", // Your Gmail password or app-specific password
            },
            secure: true, // Use secure connection
            tls: {
                rejectUnauthorized: false, // Disable unauthorized SSL certificate rejection (not recommended for production)
            },
        });

        const mailOptions = {
            from: "frederikmilland95@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                emailType === "VERIFY"
                    ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                    : `${process.env.DOMAIN}/resetpassword?token=${resetToken}`
            }">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }
            or copy and paste the link below in your browser. <br> ${
                emailType === "VERIFY"
                    ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                    : `${process.env.DOMAIN}/resetpassword?token=${resetToken}`
            }
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
