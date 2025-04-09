'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

export default function Navigation() {
    const { isSignedIn, signOut, profilePic } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        signOut();
        setIsDropdownOpen(false);
    };

    return(
        <div className="w-full flex gap-8 justify-center md:justify-end items-center py-1">
            <Link href="/vidburdir" className="hover:underline">Dagskrá</Link>
            {isSignedIn ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 hover:cursor-pointer rounded-full"
                    >
                        <Image 
                            src={profilePic || "/placeholder-user.png"}
                            alt="Prófíl mynd"
                            width={40}
                            height={40}
                            className="rounded-full aspect-square"
                        />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 flex flex-col mt-2 bg-white border shadow-lg rounded-lg w-40">
                            <Link 
                                href="/notandi"
                                onClick={() => setIsDropdownOpen(false)}
                                className="text-left w-full pt-3 pb-2 px-5"
                            >
                                Minn prófíll
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="cursor-pointer text-left w-full pb-3 pt-2 px-5"
                            >
                                Skrá út
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link href="/innskraning" className="bg-blue-500 hover:bg-blue-600 py-2 px-3 text-white rounded-lg">
                Innskráning
                </Link>
            )}
        </div>
    );
}