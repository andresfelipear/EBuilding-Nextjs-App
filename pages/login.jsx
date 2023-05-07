import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import Layout from '@/components/Layout';
import '../styles/global.css';

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)

  //modal
  const [notiTitle, setNotiTitle] = useState("")
  const [notiBody, setNotiBody] = useState("")

  const submit = () => {
    const body = { username, password };

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