'use client'

import { useEffect } from "react";
import Link from "../../node_modules/next/link"
import { useRouter } from "next/navigation"
import {isUserValid} from "../PocketBase/PocketBase"

export default function Home() {

  const router = useRouter();
  
  
  return (
    <main>
      <h1>Main Page</h1>
      <Link href={'/dashboard'}>
        <p>Dashboard</p>
      </Link>
    </main>
  )
}
