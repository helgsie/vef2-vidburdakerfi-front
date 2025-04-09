import { EventData } from '@/app/types';

export async function fetchEvents(): Promise<EventData[]> {
    const res = await fetch('https://vef2-vidburdakerfi-api.onrender.com/api/events', {
      next: { revalidate: 60 }, // revalidates every 60 seconds
    });
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    return res.json();
}