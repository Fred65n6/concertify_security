"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import ThemeSwitcher from "../../components/switchTheme/page";
import { RiEdit2Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { SlLogout } from "react-icons/sl";

interface Genre {
    _id: string;
    genre_name: string;
  }

interface Venue {
    _id: string;
    venue_name: string;
}



export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");

    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<string>("");

    const [data, setData] = useState({
        username: "unknown",
        userId: null,
        userEmail: "unknown"
    });
    const [user, setUser] = React.useState({
        newpassword: "",
        email: "",
        password: "",
        confirmpassword: "",
        newUsername: "",
    });

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            console.log("log out successfull");
            router.push("/");
            localStorage.setItem('shouldReload', 'true');
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/cookieUser");
            console.log(res.data);
            const userData = res.data.data;
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
                genres: userData.genres,
                venues: userData.venues,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        setUser({...user, email: data.userEmail});
    }, [data.userEmail]);


    // -- MODAL FUNCTIONS START
    const openChangePasswordModal = () => {
        const modal = document.getElementById("changePasswordModal");
        modal?.classList.remove("hidden");
        modal?.classList.add("grid");
    };

    const openChangeUsernamedModal = () => {
        const UsernameModal = document.getElementById("changeUsernameModal");
        UsernameModal?.classList.remove("hidden");
        UsernameModal?.classList.add("grid");
    };

    
    const closeUsernameModule = () => {
        const changeUsernameModule = document.getElementById("changeUsernameModal");
        changeUsernameModule?.classList.add("hidden");
        changeUsernameModule?.classList.remove("grid");
      };
      
    const closePasswordModule = () => {
        const modal = document.getElementById("changePasswordModal");
        modal?.classList.add("hidden");
        modal?.classList.remove("grid");
      };


    // -- CHANGE USERNAME
    const changeUsername = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changeUsername",
                user
            );
            console.log("username changed", response.data);
            // showUsernameChangeMessage();
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
            closeUsernameModule();
            window.location.reload();

        }
    };

    // -- CHANGE PASSWORD
    const changePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/users/changePassword",
                user
            );
            console.log("password changed", response.data);
            // showPasswordChangeMessage();
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
            closeUsernameModule();
        }
    };


    return (
        <div className="grid pt-8">
            <h1 className="dark:text-white font-bold text-3xl">Profile / <span className="text-[#5311BF] dark:text-[#8e0bf5]">{data.username}</span></h1>
            
            <section className="flex gap-4 mt-10">
                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">                    
                    <p className="text-lg dark:text-black">
                        Email: <span className="brand_purple">{data.userEmail}</span>
                    </p>

                    <div className="flex item-center justify-between">
                        <p className="text-lg dark:text-black">
                            Username:{" "}
                            <span className="brand_purple">{data.username}</span>
                        </p>
                        <button onClick={openChangeUsernamedModal}>
                        <RiEdit2Fill className="dark:fill-black"/>
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <p className="text-lg dark:text-black">
                            Password: <span className="brand_purple">********</span>
                        </p>

                        <button onClick={openChangePasswordModal}>
                            <RiEdit2Fill className="dark:fill-black"/>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-8 md:hidden">
                        <p className="text-lg dark:text-black">
                            Dark mode
                        </p>

                        <ThemeSwitcher/>
                    </div>
                </div>
            </section>

            {/* PREFERENCES */}

            <section className="flex gap-4 mt-10">
                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">                    
                    <div className="flex flex-col gap-4">
                        <h2 className="text-black font-bold text-xl">Preferred genres</h2>
                            <div className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8">
                                <span className="text-[#5311BF]">Genere</span>
                            </div>
                        {/* {selectedGenres.map((genre, index) => (
                            <p> Genres: <span className="brand_purple">{data.genres.genre_name}</span></p>
                        ))} */}
                    </div>
                </div>

                <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">                    
                    <div className="flex flex-col gap-4">
                        <h2 className="text-black font-bold text-xl">Preferred venues</h2>
                        <div className="flex flex-wrap gap-4">
                            <div className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8">
                                <span className="text-[#5311BF]">Venue</span>
                            </div>

                            <div className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8">
                                <span className="text-[#5311BF]">Venue</span>
                            </div>

                            <div className="w-fit rounded-full border-[1px] border-solid border-[#5311BF] py-2 px-8">
                                <span className="text-[#5311BF]">Venue</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOG OUT BUTTON */}
            <button
                onClick={logout}
                className="w-full flex gap-2 items-center mt-12"
            >
                <span className="text-[#5311BF] dark:text-white">Log out</span>
                <SlLogout className="fill-[#5311BF] dark:fill-white"/>
            </button>
            

            {/* CHANGE USERNAME MODAL */}
            <div id="changeUsernameModal" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 mx-4 md:m-0 flex flex-col items-center w-fill md:w-[800px] bg-white rounded-lg dark:bg-[#202124]">
                    <button
                        type="button"
                        onClick={closeUsernameModule}
                        className="cursor-pointer ml-[100%]"
                    >
                        <CgClose/>
                    </button>

                    <div className="flex flex-col w-full gap-2">
                        <span className="w-full text-xl font-semibold text-[#5311BF] dark:text-[#8e0bf5] mb-6">Change username</span>
                        <input
                            readOnly={true}
                            className="m-2 p-2 rounded-md text-left text-black bg-slate-200 hidden"
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder=""
                        />
                        <label htmlFor="password" className="w-fit text-sm text-gray-600">Choose a new username</label>
                        <input
                            className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                            type="text"
                            id="newUsername"
                            placeholder="Start typing..."
                            value={user.newUsername}
                            onChange={(e) =>
                                setUser({...user, newUsername: e.target.value})
                            }
                        
                        />
                        {error && <div className="text-red-500">{error}</div>}

                    </div>

                    <button
                        onClick={changeUsername}
                        className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                    >
                        Confirm
                    </button>
                </div>
            </div>

            {/* CHANGE PASSWORD MODAL */}
            <div id="changePasswordModal" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
                <div className="p-10 mx-4 md:m-0 flex flex-col items-center md:w-[800px] bg-white rounded-lg dark:bg-[#202124]">
                    <button
                        type="button"
                        onClick={closePasswordModule}
                        className="cursor-pointer ml-[100%]"
                    >
                        <CgClose/>
                    </button>
                    <div className="flex flex-col gap-4 items-center w-full">
                        <span className="w-full text-xl font-semibold text-[#5311BF] dark:text-[#8e0bf5] mb-6">Change password</span>
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col w-full gap-2">
                                    <input
                                        readOnly={true}
                                        className="m-2 p-2 rounded-md text-left text-black bg-slate-200 hidden"
                                        type="text"
                                        id="email"
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        placeholder=""
                                    />
                                    <label htmlFor="password" className="w-fit text-sm text-gray-600">Old password</label>
                                    <input
                                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                        type="password"
                                        id="password"
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser({...user, password: e.target.value})
                                        }
                                        placeholder="Type your old password..."
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2">
                                    <label htmlFor="password" className="w-fit text-sm text-gray-600">New password</label>
                                    <input
                                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                        type="password"
                                        id="password"
                                        value={user.newpassword}
                                        onChange={(e) =>
                                            setUser({...user, newpassword: e.target.value})
                                        }
                                        placeholder="Type new password..."
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2">
                                    <label htmlFor="confirm_password" className="w-fit text-sm text-gray-600">
                                        Confirm new password
                                    </label>
                                    <input
                                        className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                                        type="password"
                                        id="confirm_password"
                                        value={user.confirmpassword}
                                        onChange={(e) =>
                                            setUser({...user, confirmpassword: e.target.value})
                                        }
                                        placeholder="Confirm new password..."
                                    />
                                </div>
                            </div>
                        {error && <div className="text-red-500">{error}</div>}
                    </div>
                    <button
                        onClick={changePassword}
                        className="m-4 brand_gradient px-12 py-4 rounded-full text-white mt-8"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
