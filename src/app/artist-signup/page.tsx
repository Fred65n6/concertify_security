"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "flowbite-react";
import { CgClose } from "react-icons/cg";


interface Genre {
  _id: string;
  genre_name: string;
}

interface ShowGenresProps {
  onSubmit: (selectedGenres: string[], email: string) => void;
}

interface Venue {
  _id: string;
  venue_name: string;
}

interface ShowVenuesProps {
  onSubmit: (selectedVenues: string[], email: string) => void;
}

export default function SignupPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const switchToLoginModule = () => {
    const loginModule = document.getElementById("login_module");
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
    loginModule?.classList.remove("hidden");
    loginModule?.classList.add("grid");
  };

  const closeSignupModule = () => {
    const signupModule = document.getElementById("signup_module");
    signupModule?.classList.add("hidden");
    signupModule?.classList.remove("grid");
  };

  // Send information to API'en signup
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/artistSignup", user);
      console.log("Signup success", response.data);
      signFlowUpCompleteMessage();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during signup.");
      }
      console.log("API signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  const closeSignup = () => {
    const signUpWindow = document.getElementById("signup_module");
    if (signUpWindow) {
      signUpWindow.classList.add("hidden");
      signUpWindow.classList.remove("grid");
    }
  }

  const signFlowUpCompleteMessage = () => {
    const signupFlowCompleteMessage = document.getElementById("signup_flow_complete");
    const signUpForm = document.getElementById("signup_form");
    const preferredGenres = document.getElementById("signup_preference_genres");
    const preferredVenues = document.getElementById("signup_preference_venues");
    if (signupFlowCompleteMessage) {
      signupFlowCompleteMessage.classList.remove("hidden");
      signupFlowCompleteMessage.classList.add("block");
      signUpForm?.classList.add("hidden");
      preferredGenres?.classList.add("hidden");
      preferredVenues?.classList.add("hidden");
    }
    console.log("signFlowUpCompleteMessage");
  };

  // Disabling the button if not all fields are filled out
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.confirmpassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    fetchData();
    fetchVenueData();
  }, [user]);

  const fetchVenueData = async () => {
    try {
        const response = await axios.get("/api/data/genreData");
        setGenres(response.data.data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<{ data: Venue[] }>("/api/data/venueData");
      setVenues(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setLoading(false);
      setError("Error fetching venues");
    }
  };


  return (
    <>
      <div id="signup_module" className="grid h-screen m-auto items-center justify-center backdrop-blur-sm z-50">
        {/* SIGNUP FORM: STEP 1 */}
        <div id="signup_form">
          <div className="p-10 mx-4 md:m-0 flex flex-col items-center w-fill md:w-[800px] bg-white rounded-lg dark:bg-[#12082a]">
              <span className="mb-4 text-3xl font-bold dark:text-white">
                {loading ? "Processing" : "Artist signup"}
              </span>
              <p className="mb-6">Create an artist profile to start uploading concerts</p>
              
              {/* FORM FIELDS */}
              <div className="flex flex-col gap-4 w-full">

                {/* USERNAME */}
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="username" className="w-fit text-sm dark:text-gray-100">Artist Name</label>
                  <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Artist name"
                  />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="email" className="w-fit text-sm dark:text-gray-100">Artist email</label>
                  <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Artist email"
                  />
                </div>

                <div className="flex gap-4">
                  {/* PASSWORD */}
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="password" className="w-fit text-sm dark:text-gray-100">Password</label>
                    <input
                    className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                      type="password"
                      id="password"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      placeholder="Password"
                    />
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="confirmpassword" className="w-fit text-sm dark:text-gray-100">Confirm password</label>
                    <input
                      className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full dark:text-black"
                      type="password"
                      id="confirmpassword"
                      value={user.confirmpassword}
                      onChange={(e) =>
                        setUser({ ...user, confirmpassword: e.target.value })
                      }
                      placeholder="Confirm your password"
                    />
                  </div>

                </div>
              </div>
               {/* FORM FIELDS END */}

              {error && <div className="text-red-500">{error}</div>}
            
            <button
              onClick={onSignup}
              className="mb-4 mt-8 brand_gradient px-12 py-4 rounded-full text-white"
            >
              {buttonDisabled ? "Please fill out all fields to sign up..." : "Sign up"}
            </button>

            <div className="grid gap-4 text-center mt-4">
              <p>
                Already have an account?
                <button
                  type="button"
                  className="text-purple-700 hover:underline pl-1"
                  onClick={switchToLoginModule}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

         {/* SIGN UP FLOW COMPLETE MESSAGE */}
        <div id="signup_flow_complete" className="hidden">
          <div className="flex flex-col md:-mt-32 items-center justify-center p-8 bg-white w-[400px] md:w-[600px] lg:w-[800px] dark:bg-[#202124] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-white/20 rounded-lg">
            <h1 className="text-2xl font-bold text-center mx-6 mt-10">
              We've send a link to your email
            </h1>
            <p className="mt-5 text-center leading-8">
              To verify your identity and create your artist profile, <br /> please check you email and click the verifificaion link.
            </p>
            <p className="mt-5 mb-10 text-center text-red-500 font-bold leading-8">
              The link expires after 30 minutes! <br />
              <span className="text-black font-normal">(If you don't complete the signup by then, contact support)</span>
            </p>
            <button onClick={closeSignup} className="mb-4 mt-2 brand_gradient px-12 py-4 rounded-full text-white">Close</button>
          </div>
        </div>
      </div>
    </>
  );
}