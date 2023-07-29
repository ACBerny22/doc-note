'use client'

import { getPacs, isUserValid, searchPacs } from "@/PocketBase/PocketBase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import PatientTag from "@/components/PatientTag";
import {BiSearchAlt, BiRefresh} from 'react-icons/bi'
import PacAddButton from "@/components/PacAddButton";
import { useDarkStore } from "@/states/themeProvider";

export default function Pacientes(){
   
    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [pacs, setPacs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const {isDark, setIsDark} = useDarkStore()

    async function loadPacs(){
        const data = await getPacs();
        setPacs(data);
      }

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        loadPacs();
    }, [])

    async function findOne() {
        const data = await searchPacs(searchTerm);
        const dataArray = data.items
        setPacs(dataArray)
        console.log(data)
    }
    
    return(
        <div className={`${ isDark ? 'dark' : ""}` }>     
            <div className={`flex gap-16 flex-col p-10 xl:p-16 font-poppins dark:bg-gray-800 dark:text-white`}>    
                <h1 className="text-4xl font-light">Pacientes</h1>
                <div className="flex gap-5 w-full ">    
                        <BiSearchAlt
                        className="text-2xl mt-2"
                        />
                        <input
                        type="text"
                        placeholder="Search by name"
                        className="p-2  w-full bg-secondary-blue dark:bg-gray-600 rounded-xl text-zinc-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={()=>{findOne()}}
                        className="bg-slate-600 p-3 text-white rounded-xl dark:bg-gray-900">Buscar</button>
                        <button onClick={async () => { await loadPacs()}}>
                            <BiRefresh className="text-4xl text-slate-600 dark:text-gray-900"></BiRefresh>
                        </button>
                </div>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <PacAddButton></PacAddButton>
                        {pacs.map((item) => (
                            <PatientTag key={item.id} id={item.id} nombre={item.nombre} apellidos={item.apellidos} edad={item.edad} sexo={item.sexo}
                            fecha_nac={item.fecha_nac.slice(0, 10)} curp={item.curp}></PatientTag>
                        ))}
                </div>
            </div>
        </div>
    )
}