"use client";
import { fetchEvents } from '@/lib/api';
import EventList from '../components/EventList';
import { useEffect, useState } from 'react';
import { EventData } from '../types';

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
      setEvents(allEvents);
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    return event.titleIs.toLowerCase().includes(searchTerm.toLowerCase()) || event.formattedAddress.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="py-16 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold self-end">Dagskrá</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sláðu inn leitarorð..."
          className="border border-gray-300 px-6 py-3 rounded-3xl w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <ul className="space-y-4">
        <EventList events={filteredEvents} />
      </ul>
    </div>
  );
}