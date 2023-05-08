import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Layout from '@/components/Layout';
import '../styles/global.css';
import { UserContext } from "../context/UserContext"
import { useRouter } from 'next/router'

function Login() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disabled, setDisabled] = useState(true)

    //User Context
    const [userContext, setUserContext] = useContext(UserContext)

    //Router to navigate between pages
    const router = useRouter()

    const submit = () => {
        if (confirmPassword === password) {
            const body = { username, email, password };
            console.log(process.env.NEXT_PUBLIC_API_URL + "/api/signup");
            console.log(body);
            fetch(process.env.NEXT_PUBLIC_API_URL + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include"
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(res.status);
                    } else {
                        setUserContext(prev => ({ ...prev, token: res.token }))
                        router.push('/')
                    }
                })
                .catch((err) => {
                    console.log("Error Signing Up!", "Username and/or Email already exists")
                });

        } else {
            setConfirmPassword("")
            setPassword("")
        }

    }

    useEffect(() => {
        if (password.length > 3 && confirmPassword > 3 && (password == confirmPassword)) {
            setDisabled(false)

        } else {
            setDisabled(true)
        }
    }, [password, confirmPassword])
    return (
        <Layout>
            <div className="p-10 my-20 mx-auto w-1/4 bg-gray-800 text-zinc-300 block rounded-lg">
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Username</label>
                    <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="text" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Email</label>
                    <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold ">Password</label>
                    <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {password.length !== 0 && password.length <= 3 && (
                        <p className="text-stone-300 text-xs italic">
                            Password must have more than 3 characters
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-bold ">Confirm Password</label>
                    <input className="block w-full px-4 py-2 border border-gray-300 rounded-md" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    {confirmPassword !== password && (
                        <p className="text-stone-300 text-xs italic">
                            Confirm Password and Password do not match
                        </p>
                    )}
                </div>
                <div className="flex justify-center">
                    <button className={"px-4 py-2 rounded-md" + (disabled ? " bg-zinc-300 text-gray-900 opacity-50 cursor-not-allowed" : " bg-zinc-300 text-gray-900")} onClick={submit} disabled={disabled}>Sign Up</button>
                </div>
            </div>
        </Layout>


    )
}

export default Login
