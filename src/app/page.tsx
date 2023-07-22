'use client'

import { useEffect } from "react";
import Link from "../../node_modules/next/link"
import { useRouter } from "../../node_modules/next/navigation"
import {isUserValid} from "../PocketBase/PocketBase"

export default function Home() {

  const router = useRouter();
  
  useEffect(() => {
    if(!isUserValid){
      router.push('/login')
    }
  
    if(isUserValid){
      router.push('/dashboard')
    }
  },[])

  
  return (
    <main>
      <h1>Main Page</h1>
      <Link href={'/dashboard'}>
        <p>Dashboard</p>
      </Link>
    </main>
  )
}
