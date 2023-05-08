import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useCallback} from 'react'

function Header() {
  const router = useRouter()
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((prev) => ({ ...prev, details: data }));
      } else {
        if (response.status === 401) {
          window.location.reload();
        } else {
          setUserContext((prev) => ({ ...prev, details: null }));
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details && userContext.token) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userContext.details]);


  //logout
  const logoutHandler = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (!response.ok) {
        console.log(response)
        //throw new Error(response.status);
      }
      else {
        const data = await response.json()
        setUserContext(prev => ({ ...prev, details: undefined, token: null, cartId: null }))
        router.push('/')
      }

    });
  }



  return (
    <header className="bg-gray-900 text-zinc-300 block">
      <div className="py-4 text-center font-medium w-fit m-auto border-b-2 mb-10">
        <Link href="/"><h1 className="uppercase text-7xl">design lux</h1></Link>
        <p className="text-right italic">We design what you dream</p>
      </div>
      <nav className="grid grid-cols-6 gap-4 p-4 border-t-8 text-sm">
        <div className='flex capitalize col-start-2 col-span-4 justify-around items-center'>
          <a href="#">services</a>
          <a href="#">interior design</a>
          <a href="#">home automation</a>
        </div>
        <div className='text-right space-x-4'>
          {userContext.details ?
            (
            <div className='flex justify-end items-center gap-4'>
            <div className='capitalize'>{userContext.details.username}</div>
            <div className='cursor-pointer bg-zinc-300 text-gray-900 py-2 px-1.5 rounded-lg font-medium' onClick={logoutHandler}>LogOut</div>
            </div>
            ) :
            (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup" className='bg-zinc-300 text-gray-900 py-2 px-1.5 rounded-lg font-medium'>Sign Up</Link>
            </>
            )
          }

        </div>
      </nav >
    </header >
  );
}

export default Header;
