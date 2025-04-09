"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventData } from "../types";

type EventCardProps = {
    event: EventData;
  };

export default function EventCard({ event }: EventCardProps) {
    const randomImage = event.randomImage;
    const title = event.titleIs || "Óþekktur titill";
    const id = event.id || "#";
    const address = event.formattedAddress || "Óþekkt heimilisfang";

    const formatTime = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleTimeString('is-IS', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
    };

    return (
        <Link href={`/vidburdir/${id}`} className="rounded-2xl shadow-md bg-white overflow-hidden w-full hover:shadow-lg transition">
            {randomImage && (
                <Image
                    src={randomImage}
                    alt={title}
                    width={400}
                    height={250}
                    className="w-full aspect-3/2 object-cover"
                />
            )}
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-600">{address}</p>
                <p className="text-sm text-gray-500">{formatTime(event.start)} - {formatTime(event.end)}</p>
            </div>
        </Link>
    );
}