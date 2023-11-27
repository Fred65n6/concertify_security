"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SlPlus } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { RiEdit2Fill } from "react-icons/ri";
import {SlMusicToneAlt, SlArrowLeft, SlQuestion} from "react-icons/sl";
import Link from "../../../node_modules/next/link";
import { CgClose } from "react-icons/cg";


interface Concert {
    _id: string;
    concert_artist: {
        artist_id: string;
        artist_name: string;
        artist_instagram: string;
        artist_youtube: string;
        artist_facebook: string;
        artist_twitter: string;
        artist_spotify: string;
    };
    concert_date: string;
    concert_description: string;
    concert_image: string;
    concert_name: string;
    concert_start: string;
    concert_genre: {
        genre_id: string;
        genre_name: string;
    };
    concert_venue: {
        venue_id: string;
        venue_name: string;
        venue_address: string;
        venue_location: string;
    };
    concert_doors: string;
}

const Admin: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/data/concertData");
            setConcerts(response.data.data);
        } catch (error) {
            console.error("Error fetching concerts:", error);
        }
    };

    fetchData();
}, []);


  const totalConcerts = concerts.length;

  const openDeleteModule = (concert: Concert) => {
    setSelectedConcert(concert);
    const deleteConcertModule = document.getElementById("delete_concert_id");
    deleteConcertModule?.classList.remove("hidden");
    deleteConcertModule?.classList.add("grid");
};

const closeDeleteModule = () => {
  const deleteConcertModule = document.getElementById("delete_concert_id");
  deleteConcertModule?.classList.add("hidden");
  deleteConcertModule?.classList.remove("grid");
};


const openEditModule = (concert: Concert) => {
    setSelectedConcert(concert);
    const deleteConcertModule = document.getElementById("edit_concert_id");
    deleteConcertModule?.classList.remove("hidden");
    deleteConcertModule?.classList.add("grid");
};

const closeEditModule = () => {
  const deleteConcertModule = document.getElementById("edit_concert_id");
  deleteConcertModule?.classList.add("hidden");
  deleteConcertModule?.classList.remove("grid");
};


  const handleDeleteConcert = async (concertId: string) => {
    try {
      const res = await fetch('/api/admin/deleteConcert', {
        method: 'DELETE',
        body: JSON.stringify({ concertId }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
      } else {
        const result = await res.json();
        if (result.success) {
          console.log(result.message);
          setConcerts(elm => elm.filter(concert => concert._id !== concertId));

          closeDeleteModule();
        } else {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error('Error deleting concert:', error);
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
        <h1 className="font-bold text-4xl pb-4 pt-8">Admin / <span className="text-[#5311BF] dark:text-purple-500">concerts</span></h1>

        <section className="flex w-full justify-between py-8 items-center border-b-[1px] border-gray-100 dark:border-[#23124b]">
            <div className="flex gap-2">
              <SlMusicToneAlt className="stroke-[#5311BF] dark:stroke-purple-500 w-5 h-5" id="user" />
              <span>There are <span className="text-[#5311BF] dark:text-purple-500 font-bold">{totalConcerts}</span> concerts in total</span>
            </div>
            <button className="flex gap-2 rounded-full bg-purple-100 brand_purple items-center px-8 py-2 hover:bg-purple-200">
              <Link href="/admin-upload-concert">Upload new concert</Link>
              <SlPlus/>
          </button>
        </section>

          {/* <form className="flex flex-col items-center gap-8 py-8"> */}
          <form className="">
            <table className="w-full">
              <thead>
                <tr className="lg:flex justify-start w-full">
                  <th className="text-left w-fit md:w-1/2">Concert name</th>
                  <th className="text-left w-fit md:w-1/2">Artist</th>
                  <th className="text-left w-fit md:w-1/2">Date</th>
                  <th className="text-left w-fit md:w-1/2">Venue</th>
                  <th className="text-right w-fit md:w-1/12"></th>
                  <th className="text-right w-fit md:w-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {concerts?.map((concert) => (
                  <tr key={concert._id} className="flex justify-start w-full">
                    <td className="text-left w-fit md:w-1/2">{concert.concert_name}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_artist.artist_name}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_date}</td>
                    <td className="text-left w-fit md:w-1/2">{concert.concert_venue.venue_name}</td>
                    <td className="text-right w-fit md:w-1/12">
                      <button
                        type="button"
                        onClick={() => openEditModule(concert)}
                      >
                          <RiEdit2Fill className="fill-[#5311BF] dark:fill-white"/>
                      </button>
                    </td>
                    <td className="text-right w-fit md:w-1/12">
                      <button
                        type="button"
                        onClick={() => openDeleteModule(concert)}
                      >

                        <AiFillDelete
                          className="fill-[#5311BF] dark:fill-white w-5 h-5"
                          id="deleteConcert"
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


    {/* DELETE CONCERT MODULE */}
      {selectedConcert && (
      <div id="delete_concert_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
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
              <span className="italic font-bold">{selectedConcert.concert_name}</span>. This action can not be reverted.
            </p>
            <button 
                type="button"
                onClick={() => handleDeleteConcert(selectedConcert._id)}
                className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
                Yes I am sure
            </button>
            </div>
        </div>
      </div>
      )}

    {/* EDIT CONCERT MODULE */}
    {selectedConcert && (
    <div id="edit_concert_id" className="absolute top-0 left-0 bg-slate-900/50 w-full h-screen items-center justify-center hidden backdrop-blur-sm z-50">
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
            name="concert_id"
            value={selectedConcert._id}
            />
            
          <div className="flex gap-2 items-center">
            <label htmlFor="concert_description">Concert name</label>
            <input
                readOnly={true}
                className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                type="text"
                name="concert_name"
                value={selectedConcert.concert_name}
            />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="concert_description">Description</label>
              <input
                  readOnly={true}
                  className="bg-slate-100 border-0 px-8 py-4 rounded-full w-full"
                  type="text"
                  name="concert_description"
                  value={selectedConcert.concert_description}
              />
            </div>



        {/* <button 
            type="button"
            onClick={() => handleSaveChanges(selectedConcert._id)}
            className="rounded-full w-fit h-fit py-4 px-4 brand_gradient text-white hover:bg-purple-200 flex gap-2 align-middle">
            Save changes
        </button> */}

        </div>
    </div>
    </div>
    )}

    </>
  );
};

export default Admin;