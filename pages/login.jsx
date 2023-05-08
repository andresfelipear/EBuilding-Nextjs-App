import React from 'react'
import Link from 'next/link';
import Layout from '@/components/Layout';
import '../styles/global.css';
import { UserContext } from '@/context/UserContext';
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)

  const [userContext, setUserContext] = useContext(UserContext)
  const router = useRouter()

  const submit = () => {
    const body = { username, password };
    fetch(process.env.NEXT_PUBLIC_API_URL+"/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include"
  })
      .then(async (res) => {
        
          if (!res.ok) {
              throw new Error(res.status);
          } else {
              const data = await res.json()
              setUserContext(prev => ({ ...prev, token: data.token }))
              router.push('/')
              return data
          }
      })
      .catch((err) => {
          console.log("Username or password that you entered is incorrect. Use a valid credential and try again");
          setUsername("")
          setPassword("")
      });

  }

  useEffect(() => {
    if (password && username) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [password, username])
  return (
    <Layout>
        <div className="my-20 mx-auto w-1/4 ">
          <div className="p-8 bg-gray-800 text-zinc-300 block rounded-lg">
            <div className="mb-4">
              <label className="block mb-2 font-bold">Username</label>
              <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="text" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold ">Password</label>
              <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <Link className="block mt-2 text-sm font-light text-zinc-300 italic" href={"/forgotPassword"}>Forgot Password?</Link>
            </div>
            <div className="flex justify-center">
              <button className={"px-4 py-2 rounded-md" + (disabled ? " bg-zinc-300 text-gray-900 opacity-50 cursor-not-allowed" : " bg-zinc-300 text-gray-900")} onClick={submit} disabled={disabled}>Login</button>
            </div>
          </div>
        </div>
    </Layout>


  )
}

export default Login