import React from "react";
import Link from "next/link";

export default function Header() {

    return(
        <header className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-col gap-2 mt-4 p-2 text-center sm:text-left">
                <Link href="/"><h1 className="font-bold text-5xl sm:text-5xl text-blue-400">Menningarnótt</h1></Link>
            </div>
        </header>
    );
}