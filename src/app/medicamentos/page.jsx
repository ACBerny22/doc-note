'use client'

import { getMeds, isUserValid } from "@/PocketBase/PocketBase"
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import MedTag from "@/components/MedTag";
import {BiSearchAlt} from 'react-icons/bi'


export default function Medicamentos(){
    
    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [meds, setMeds] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        async function loadMeds(){
          const data = await getMeds();
          setMeds(data);
        }

        loadMeds();
    }, [])

    const filteredObjects = meds.filter((obj) =>
        obj.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
       
    return(
        <>
        {domLoaded &&
        
            <div className="flex gap-16 flex-col mx-10 mt-10">
                <h1 className="text-4xl font-bold">Medicamentos</h1>
                <div className="flex gap-5 w-full">    
                    <BiSearchAlt
                    className="text-2xl mt-2"
                    />
                    <input
                    type="text"
                    placeholder="Search by name"
                    className="py-2 focus:border-blue-500 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredObjects.map((item) => (
                        <MedTag key={item.id} id={item.id} nombre={item.nombre} gramaje={item.gramaje} presentacion={item.presentacion}></MedTag>
                    ))}
                </div>
            </div>
        }
        </>
    )
}