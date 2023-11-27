"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // Send information til API'en signup
    const sendLink = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/forgotPassword",
                user
            );
            console.log("Signup success", response.data);
            // showMessage();
        } catch (error: any) {
            toast.error(error.message);
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    const showMessage = () => {
        const mailSendMessage = document.getElementById("mailSendMessage");
        const forgotForm = document.getElementById("forgotForm");
        mailSendMessage?.classList.remove("hidden");
        mailSendMessage?.classList.add("block"); // Add the "grid" class to make it visible
        forgotForm?.classList.add("hidden");
        console.log("showMessage");
    };

    // DISABLE SIGNUP KNAP, HVIS FELTER IKKE ER UDFYLDT

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center py-2 mt-24">
                <div className="hidden" id="mailSendMessage">
                    <h2 className="text-2xl">
                        We've send a message to your email with a password reset
                        link.
                    </h2>
                </div>
            </div>

            <div
                className="flex flex-col items-center justify-center py-2"
                id="forgotForm"
            >
                <h1 className="mb-4 text-4xl pb-4">
                    {loading ? "Processing" : "Send password reset link"}
                </h1>
                <hr />
                <div className="grid gap-2 text-center items-center">
                    <label className="text-center" htmlFor="email">
                        Type your email
                    </label>
                    <input
                        className="m-2 p-2 rounded-md text-left text-black bg-slate-200"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({...user, email: e.target.value})
                        }
                        placeholder="email"
                    />
                    <button
                        onClick={sendLink}
                        className="mb-6 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                    >
                        {buttonDisabled ? "Missing fields" : "Send reset link"}
                    </button>
                    <Link href="/login">Go to login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
