import { fetchEvents } from "@/lib/api";
import EventList from "./components/EventList";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const events = await fetchEvents();
  const firstThree = events.slice(0, 3);
  
  return (
    <main className="mt-16 flex flex-col gap-6">
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="font-bold text-xl">Stærsta afmælis- og borgarhátíð Reykjavíkur</h2>
          <p>Dagana 24-26. ágúst munu fyrirtæki og stofnanir í Reykjavík bjóða upp á fjölbreytta og skemmtilega dagskrá í tilefni borgarafmælis Reykjavíkur. Eitthvað verður í boði fyrir alla aldurshópa.</p>
        </div>
        <div className="">
          <Image 
            src="/menningarnott.jpeg"
            className="object-cover h-[350px] rounded-xl"
            alt=""
            width={800}
            height={300}
          />
        </div>
      </div>
      <Link href="/vidburdir" className="font-bold text-2xl flex self-start">Skoða dagskrá {`->`}</Link>
      <div className="w-full">
          <EventList events={firstThree}/>
      </div>
    </main>
  );
}
