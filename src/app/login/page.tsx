'use client'
import { useState, FormEvent, useEffect } from "react"
import { login, isUserValid } from "@/PocketBase/PocketBase";
import { useRouter } from "next/navigation";

export default function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()


    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Call the onSubmit callback with the entered username and password
    await login(username, password)
  };

    useEffect(() => {
        if(isUserValid){
            router.push('/dashboard')
        }
    }, [])

    return(
        <div className="flex flex-col gap-16 items-center justify-center h-screen font-poppins">
            <h1 className="font-bold text-2xl">Log In</h1>
        
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-7 items-center justify-center">
                <div className="flex flex-col gap-3">
                    <label htmlFor="username"
                    className="text-lg font-light text-slate-400">Nombre de Usuario:</label>
                    <input
                    className="text-lg font-medium w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    type="text"
                    id="username"
                    value={username}
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="password"
                    className="text-lg font-light text-slate-400">Contraseña:</label>
                    <input
                    className="text-lg font-medium w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    type="password"
                    id="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-accent-blue w-full rounded-xl text-white text-lg py-3
                hover:bg-primary-blue transition-all">Log In</button>
            </form>
            <p className="text-slate-400">Not a member. <span className="text-slate-600 underline">Contact Me</span></p>
        </div>
    )
}