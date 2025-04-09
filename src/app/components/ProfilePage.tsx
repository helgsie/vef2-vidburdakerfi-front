'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { isSignedIn, signOut, profilePic, setProfilePic } = useAuth();
    const [, setIsDropdownOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setProfilePic(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSignOut = () => {
        signOut();
        setIsDropdownOpen(false);
        redirect("/");
    };

    return (
        <div className="mt-16 flex flex-col gap-1 items-center text-center">
      <h1 className="text-2xl font-bold mb-4">Minn prófíll</h1>
      <div>
        {profilePic ? (
          <Image
            src={profilePic}
            alt="Prófíl mynd"
            width={100}
            height={100}
            className="rounded-full aspect-square"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white">Engin mynd</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="profilePic"
          className="inline-block bg-blue-500 text-white mt-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600"
        >
          Velja mynd
        </label>
      </div>
      {isSignedIn && (
        <button
          onClick={handleSignOut}
          className="cursor-pointer border border-red-400 transition hover:bg-red-400 hover:text-white py-2 px-4 mt-4 rounded-lg"
        >
          Skrá út
        </button>
      )}
    </div>
    );
}
