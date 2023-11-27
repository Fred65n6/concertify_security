"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import { CgClose } from "react-icons/cg";
import ButtonPrimary from "../components/buttonPrimary/page";


export default function LoginPage() {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = React.useState<string>("");
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const openSignupModule = () => {
        const signupModule = document.getElementById("signup_module");
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.add("hidden");
        signupModule?.classList.remove("hidden");
        signupModule?.classList.add("grid");
    };

    const closeLoginModule = () => {
        const loginModule = document.getElementById("login_module");
        loginModule?.classList.add("hidden");
        loginModule?.classList.remove("grid");
    };

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            console.log(response.data);
            // const decodedToken = jwt.decode(response.data.token) as {
            //   isAdmin: boolean;
            // };
            // window.location.reload();
            if (response.data.isAdmin) {
                router.push("/admin-dashboard");
                localStorage.setItem('shouldReload', 'true');
            } else {
                window.location.reload();
            }

        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred during signup.");
            }
            console.log("API signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
        <div id="login_module" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 mx-4 md:m-0 flex flex-col items-center w-fill md:w-[800px] bg-white rounded-lg dark:bg-[#12082a]">
            <button
                type="button"
                onClick={closeLoginModule}
                className="cursor-pointer ml-[100%]"
                >
                <CgClose/>
            </button>
            
            <span className="mb-4 text-3xl font-bold dark:text-white">
            {loading ? "Processing" : "Login"}
            </span>
            <p className="mb-6 dark:dark:text-gray-100">
                Login to continue exploring
            </p>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="email" className="w-fit text-sm dark:text-gray-100">Email</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Email"
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="password" className="w-fit text-sm dark:text-gray-100">Password</label>
                    <input
                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) =>
                    setUser({...user, password: e.target.value})
                    }
                    placeholder="Password"
                    />
                </div>
            </div>
            {error && 
            <div className="text-red-500">{error}</div>
            }
            <button
                onClick={onLogin}
                className="m-4 brand_gradient px-12 py-4 rounded-full text-white "
                disabled={buttonDisabled}
                >
            Login
            </button>
            <div className="grid gap-4 text-center mt-4">
                <div className="flex gap-2">
                    <span className="dard:dark:text-gray-100">Dont have an account yet?</span>
                    <button
                        className="text-purple-700 hover:underline"
                        onClick={openSignupModule}
                        >
                    Sign up
                    </button>
                </div>
                <Link
                    className="text-purple-700 hover:underline"
                    href="/forgotPassword"
                    >
                Forgot your password?
                </Link>
            </div>
            </div>
        </div>
     </>
    );
}
