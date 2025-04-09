"use client";
import React, { useState } from "react";
import Image from "next/image";
import { EventData } from "../types";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

type Props = {
    event: EventData;
  };

export default function EventDetails({ event }: Props) {
    const { isSignedIn } = useAuth();
    const [isAttending, setIsAttending] = useState(false);
    
    const title = event.titleIs || "Óþekktur titill";
    const address = event.formattedAddress || "Óþekkt heimilisfang";
    const description = event.textIs || "Engin lýsing til staðar.";
    const formattedDescription = description.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
    ));
    const randomImage = event.randomImage ?? "/placeholder-image.png.webp";

    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    const sameDay = startDate.toDateString() === endDate.toDateString();

    const formatDate = (date: Date) =>
        date.toLocaleDateString("is-IS", {
        day: "numeric",
        month: "long",
        year: "numeric",
        });

    const formatTime = (date: Date) =>
        date.toLocaleTimeString("is-IS", {
        hour: "2-digit",
        minute: "2-digit",
        });

    const formatted = sameDay
        ? `${formatDate(startDate)} kl. ${formatTime(startDate)} – ${formatTime(endDate)}`
        : `${formatDate(startDate)} kl. ${formatTime(startDate)} – ${formatDate(endDate)} kl. ${formatTime(endDate)}`;

    const toggleAttendEvent = () => {
        setIsAttending(prevState => !prevState);
    };

    return(
        <div className="py-6 w-full md:w-3/4 mx-auto grid grid-cols-1 gap-8 items-center rounded-3xl">
            <Image 
                src={randomImage} 
                alt={title} 
                width={500}
                height={250} 
                className="object-cover w-full rounded-xl" 
            />
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <div className="border-b border-gray-300 pb-2">
                    <p>{formatted}</p>
                    <p>{address}</p>
                </div>
                <p className="space-y-4 my-6">{formattedDescription}</p>
                <div className="flex justify-center">
                    {isSignedIn ? (
                        <div className="flex flex-col gap-8 w-full">
                            <div className="flex flex-col gap-3 mt-2 pt-6 border-t border-neutral-300">
                                <h2 className="text-xl font-bold">Gestalisti</h2>
                                <div className="">
                                    {isAttending ? (
                                        <div className="flex flex-row justify-between items-center gap-1 bg-gray-100 py-3 px-5 rounded-xl">
                                            <p>Notandi</p>
                                            <button 
                                                onClick={toggleAttendEvent}
                                                className="cursor-pointer rounded-full font-bold border text-red-400 border-red-400 transition hover:text-white hover:bg-red-400 py-1 px-3"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <button 
                                                className={`min-w-1/6 flex mx-auto py-2 px-5 border border-blue-400 hover:bg-blue-400 hover:border-blue-400 hover:text-white transition rounded-xl`}
                                                onClick={toggleAttendEvent}
                                            >
                                                <p className="mx-auto">Skrá mig</p>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="flex flex-col gap-4 items-center">
                            <p className="text-blue-500">Til að skrá þig á viðburð þarftu að skrá þig inn</p>
                            <Link href="/innskraning" className="bg-blue-500 hover:bg-blue-600 py-2 px-3 text-white rounded-lg">
                                Innskráning
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}