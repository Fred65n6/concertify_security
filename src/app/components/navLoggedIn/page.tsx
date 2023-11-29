"use client";
import React, { useState, useEffect } from "react";
import NavAdmin from "../navAdmin/page";
import NavUser from "../navUser/page";
import NavArtist from "../navArtist/page";
import axios from "axios";

interface User {
  _id: string;
  isAdmin: boolean;
  isArtist: boolean;
}

const NavLogged = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/cookieUser");
      const userData: User = response.data.data;
      if (userData.isArtist) {
        setIsArtist(true)
      } 
      if (userData.isAdmin) {
        setIsAdmin(true);
      } 
    } catch (error) {
      console.error("Error fetching user details: ", error);
      setError("Error fetching user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {isAdmin ? (
        <NavAdmin />
      ) : (
        <div className=""></div>
      )}

      {isArtist ? (
        <NavArtist />
      ) : (
        <div className=""></div>
      )}

      {!isArtist && !isAdmin ? (
        <NavUser/>
      ) : (
        <div className=""></div>
      )}
    </>
  );
};

export default NavLogged;
