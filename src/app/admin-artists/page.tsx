"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { RiEdit2Fill } from "react-icons/ri";
import {SlMusicToneAlt, SlArrowLeft, SlPlus, SlQuestion} from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import { CgClose } from "react-icons/cg";

interface Artist {
  _id: string;
  artist_name: string;
  artist_full_name: string;
  artist_nation: string;
  artist_description: string;
  artist_image: string;
  artist_dob: string;
  artist_genre: {
      genre_id: string;
      genre_name: string;
  };
}

const Admin: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/artistData");
            setArtists(response.data.data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    fetchData();
}, []);


  const totalArtists = artists.length;

  const openDeleteModule = (artist: Artist) => {
    setSelectedArtist(artist);
    const deleteArtistModule = document.getElementById("delete_artist_id");
    deleteArtistModule?.classList.remove("hidden");
    deleteArtistModule?.classList.add("grid");
};

const closeDeleteModule = () => {
  const deleteArtistModule = document.getElementById("delete_artist_id");
  deleteArtistModule?.classList.add("hidden");
  deleteArtistModule?.classList.remove("grid");
};

const openEditModule = (artist: Artist) => {
    setSelectedArtist(artist);
    const deleteArtistModule = document.getElementById("edit_artist_id");
    deleteArtistModule?.classList.remove("hidden");
    deleteArtistModule?.classList.add("grid");
};

const closeEditModule = () => {
  const deleteArtistModule = document.getElementById("edit_artist_id");
  deleteArtistModule?.classList.add("hidden");
  deleteArtistModule?.classList.remove("grid");
};



  const handleDeleteArtist = async (artistId: string) => {
    try {
      const res = await fetch('/api/admin/deleteArtist', {
        method: 'DELETE',
        body: JSON.stringify({ artistId }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
      } else {
        const result = await res.json();
        if (result.success) {
          console.log(result.message);
          setArtists(elm => elm.filter(artist => artist._id !== artistId));
          closeDeleteModule();
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };
  



  return (
    <>
      <LoginPage />
      <SignupPage />
      <div>
      <Link
            className="flex align-middle gap-2"
            href="/admin-dashboard"
        >
            <SlArrowLeft
                className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
                id="arrow_right"
                />
                Back to dashboard
        </Link>
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-[#8e0bf5]">artists</span></h1>

        <section className="flex w-full justify-between py-8 items-center border-b-[1px] border-gray-100 dark:border-[#23124b]">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-[#8e0bf5] w-5 h-5" id="user" />
              <span>There are <span className="text-[#5311BF] dark:text-[#8e0bf5] font-bold">{totalArtists}</span> artists in total</span>
            </div>
            <button className="flex gap-2 rounded-full bg-purple-100 brand_purple items-center px-8 py-2 hover:bg-purple-200">
              <Link href="/admin-upload-artist">Upload new artist</Link>
              <SlPlus/>
          </button>
        </section>

        <form className="flex flex-col items-center gap-8 py-8">
          <table className="w-full">
            <thead>
              <tr className="lg:flex justify-start w-full">
                <th className="text-left w-1/2">Artist id</th>
                <th className="text-left w-1/2">Artist name</th>
                <th className="text-left w-1/2">Full name</th>
                <th className="text-right w-1/12"></th>
                <th className="text-right w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist) => (
                <tr key={artist._id} className="flex justify-start w-full">
                  <td className="text-left w-1/2">{artist._id}</td>
                  <td className="text-left w-1/2">{artist.artist_name}</td>
                  <td className="text-left w-1/2">{artist.artist_full_name}</td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      onClick={() => openEditModule(artist)}
                    >
                        <RiEdit2Fill className="fill-[#5311BF] dark:fill-white"/>
                    </button>
                  </td>
                  <td className="text-right w-1/12">
                    <button
                      type="button"
                      onClick={() => openDeleteModule(artist)}
                    >

                      <AiFillDelete
                        className="fill-[#5311BF] dark:fill-white w-5 h-5"
                        id="deleteArtist"
                        value="upload"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>


    {/* DELETE ARTISTK MODULE */}
      {selectedArtist && (
      <div id="delete_artist_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
        <div className="p-10 flex flex-col items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#202124]">
        <button
            type="button"
            onClick={closeDeleteModule}
            className="cursor-pointer ml-[100%]"
            >
            <CgClose/>
          </button>
          
            <div className="flex flex-col gap-4 justify-center text-center items-center">
              <h1 className="dark:text-white font-bold text-3xl">Are you sure?</h1>
              <p className="dark:text-white">
              You are about to delete{" "}
              <span className="italic font-bold">{selectedArtist.artist_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteArtist(selectedArtist._id)}
                className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT ARTIST MODULE */}
    {selectedArtist && (
    <div id="edit_artist_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
    <div className="p-10 flex flex-col items-center justify-center w-[600px] bg-white rounded-lg dark:bg-[#202124]">
      <button
        type="button"
        onClick={closeEditModule}
        className="cursor-pointer ml-[100%]"
        >
        <CgClose/>
      </button>
        
        <div className="flex flex-col gap-4 justify-center text-center items-center">
        <input
            readOnly={true}
            className="hidden"
            type="text"
            name="artist_id"
            value={selectedArtist._id}
            />

          <div className="flex gap-2 items-center">
            <label htmlFor="artist_name">Artist name</label>
            <input
                readOnly={true}
                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                type="text"
                name="artist_name"
                value={selectedArtist.artist_name}
            />
          </div>



        <button 
            // type="button"
            // onClick={() => handleSaveChanges(selectedArtist._id)}
            className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
            Save changes
        </button>

        </div>
    </div>
    </div>
    )}

    </>
  );
};

export default Admin;