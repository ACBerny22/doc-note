'use client'

import {isUserValid, model} from "../../PocketBase/PocketBase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Dashboard(){

    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
        if(!isUserValid){
            router.push('/login')
        }
        
    }, [])

    return(
    <>
    {domLoaded && (
        
        <main>
            <h1>{model?.username}'s Dashboard</h1>
        </main>

    )}
    </>
    )
}