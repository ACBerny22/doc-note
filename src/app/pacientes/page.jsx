'use client'

import { getPacs, isUserValid } from "@/PocketBase/PocketBase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import PatientTag from "@/components/PatientTag";
import {BiSearchAlt} from 'react-icons/bi'


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

        async function loadPacs(){
          const data = await getPacs();
          setPacs(data);
        }

        loadPacs();
    }, [])

    const filteredObjects = pacs.filter((obj) =>
        obj.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return(
        <div className="flex gap-16 flex-col mx-10 mt-10 font-poppins">
            <h1 className="text-4xl font-bold">Pacientes</h1>
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {filteredObjects.map((item) => (
                        <PatientTag key={item.id} id={item.id} nombre={item.nombre} apellidos={item.apellidos} edad={item.edad} sexo={item.sexo}
                        fecha_nac={item.fecha_nac.slice(0, 10)}></PatientTag>
                    ))}
                </div>
        </div>
    )
}