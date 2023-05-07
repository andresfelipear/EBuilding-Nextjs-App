import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

function Header() {
  const router = useRouter()
  return (
    <header className="bg-gray-900 text-zinc-300 block">
      <div className="py-4 text-center font-medium w-fit m-auto border-b-2 mb-10">
        <Link href="/"><h1 className="uppercase text-7xl">design lux</h1></Link>
        <p className="text-right italic">We design what you dream</p>
      </div>
      <nav className="grid grid-cols-6 gap-4 p-4 border-t-8 text-sm">
        <div className='flex capitalize col-start-2 col-span-4 justify-around'>
          <a href="#">services</a>
          <a href="#">interior design</a>
          <a href="#">home automation</a>
        </div>
        <div className='text-right space-x-4'>
          <Link href="/login">Login</Link>
          <Link href="/signup" className='bg-zinc-300 text-gray-900 py-2 px-1.5 rounded-lg font-medium'>Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
