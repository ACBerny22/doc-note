'use client'

import { getPacs, isUserValid } from "@/PocketBase/PocketBase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Pacientes(){

    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [pacs, setPacs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        async function loadMeds(){
          const data = await getPacs();
          setPacs(data);
        }

        loadMeds();
    }, [])
    
    return(
        <div>
            <h1>Pagina de Pacientes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pacs.map((item) => (
                        <p key={item.id}>{item.nombre} {item.apellidos}</p>
                    ))}
                </div>
        </div>
    )
}