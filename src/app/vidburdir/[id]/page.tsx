import BackLink from '@/app/components/BackLink';
import EventDetails from '@/app/components/EventDetails';
import { fetchEvents } from '@/lib/api';
import { getRandomImageUrl } from '@/lib/imageUtils';
import { notFound } from 'next/navigation';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const events = await fetchEvents();
    const event = events.find((event) => event.id.toString() === id);

    if (!event) return notFound();

    const eventWithImage = {
        ...event,
        randomImage: getRandomImageUrl(event.id)
    };

    return (
        <div className="mt-16 flex flex-col">
            <BackLink/>
            <EventDetails event={eventWithImage} />
        </div>
    );
}