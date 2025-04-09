"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { EventData } from "../types";
import { getRandomImageUrl } from "@/lib/imageUtils";

type EventListProps = {
    events: EventData[];
};

export default function EventList({ events }: EventListProps) {
    const [eventsWithImages, setEventsWithImages] = useState<EventData[]>([]);

    useEffect(() => {
        const updatedEvents = events.map((event) => {
          return {
            ...event,
            randomImage: getRandomImageUrl(event.id),
          };
        });
        
        setEventsWithImages(updatedEvents);
    }, [events]);

    return (
        <div className="grid grid-cols-1 gap-8 w-full sm:grid-cols-2 lg:grid-cols-3">
            {eventsWithImages.map((event: EventData) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}