'use client';

import Link from 'next/link';

export default function BackLink() {
  return (
    <Link href="/vidburdir" className="text-neutral-800">
      ← Aftur í dagskrá
    </Link>
  );
}
