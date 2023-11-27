"use client";
import {useState, useEffect} from "react";
import axios from "axios";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Extract the token from the URL when the component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get("token");

        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    const handlePasswordReset = async () => {
        try {
            const response = await axios.post("/api/users/resetPassword", {
                token: token,
                newPassword: password,
            });
            console.log(response);

            if (response.status === 200) {
                setMessage("Password reset successfully! Go to login.");
            } else {
                setError("Password reset failed.");
            }
        } catch (error) {
            setError("Password reset failed.");
        }
    };

    return (
        <div className="flex flex-col items-center m-8 gap-4">
            <h1 className="text-4xl">Reset Password</h1>
            <p>Enter your new password below:</p>
            <div className="grid gap-4">
                <input
                className="bg-slate-100 p-4"
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                className="hidden"
                    readOnly={true}
                    type="token"
                    placeholder="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button onClick={handlePasswordReset} className="brand_gradient text-white rounded-full py-4 px-8">Reset Password</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
