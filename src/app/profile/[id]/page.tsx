"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import ThemeSwitcher from "../../components/switchTheme/page";
import { RiEdit2Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { SlLogout } from "react-icons/sl";
import Image from "next/image";
import User from "@/models/userModel"

interface Genre {
    _id: string;
    genre_name: string;
  }

interface Venue {
    _id: string;
    venue_name: string;
}

interface Artist {
    artist_name: string;
    artist_dob: string;
    artist_image: string;
}

interface User {
    _id: string;
    isArtist: boolean;
  }


export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    const [isArtist, setIsArtist] = useState(false);
    const [genres, setGenres] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [artist, setArtist] = useState<any[]>([]);


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
            const adminData: User = res.data.data;
            if (adminData.isArtist) {
                setIsArtist(true)
            } 
            setGenres(res.data.data.genres);
            setVenues(res.data.data.venues);
            setArtist(res.data.data.artist);
            
            setData({
                username: userData.username,
                userId: userData._id,
                userEmail: userData.email,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };


    useEffect(() => {
        getUserDetails();
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
                <h2 className="text-black font-bold text-xl">User info</h2>               
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

            {isArtist ? (
         <section className="flex gap-4 mt-10">
         <div className="bg-purple-100 w-full gap-4 py-8 rounded-lg align-middle justify-start px-8 flex flex-col">   
         <h2 className="text-black font-bold text-xl">Artist info</h2>
         <ul className="grid md:grid-cols-4 gap-8">
                 {artist.map((artist: any) => (
                     <article
                         className="w-full text-lg grid gap-4"
                         key={artist.artist_name}>
                         <p className="flex">Artist name: <span className="ml-1 brand_purple">{artist.artist_name}</span></p>
                         <p className="flex">Date of birth: <span className="ml-1 brand_purple">{artist.artist_dob}</span></p>
                         <Image
                         src={`https://concertify.s3.eu-central-1.amazonaws.com/${artist.artist_image}`}
                         width={200}
                         height={200}
                         alt="artist image"
                         className="h-auto w-full pt-4"
                     />
                     </article>
                 ))}
             </ul>
         </div>
         </section>
      ) : (
        <div className=""></div>
      )}
           

            {/* PREFERENCES */}

            {!isArtist ? (
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
            ):(
                <div className=""></div>
            )}

            {/* LOG OUT BUTTON */}
            <button
                onClick={logout}
                className="w-full flex gap-2 items-center mt-12"
            >
                <span className="text-[#5311BF] dark:text-white">Log out</span>
                <SlLogout className="fill-[#5311BF] dark:fill-white"/>
            </button>
{/*                     
            <ul className="grid md:grid-cols-4 gap-8">
                    {genres.map((genre: any) => (
                        <article
                            className="w-auto"
                            key={genre._id}>
                            <p>{genre.genre_name}</p>
                        </article>
                    ))}
                </ul>

                <ul className="grid md:grid-cols-4 gap-8">
                    {venues.map((venue: any) => (
                        <article
                            className="w-auto"
                            key={venue._id}>
                            <p>{venue.venue_name}</p>
                        </article>
                    ))}
                </ul> */}
            

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
