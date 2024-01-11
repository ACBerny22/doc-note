'use client'

import { getPacs, searchPacs } from "@/PocketBase/PocketBase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import PatientTag from "@/components/PatientTag";
import {BiSearchAlt, BiRefresh} from 'react-icons/bi'
import PacAddButton from "@/components/PacAddButton";
import {MdOutlineNavigateNext, MdOutlineNavigateBefore} from 'react-icons/md'
import LoadingScreen from "@/components/LoadingScreen";

export default function Pacientes(){
   
    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [pacs, setPacs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState();

    async function loadPacs(){
        const data = await getPacs(currentPage);
        setPacs(data.items);
        setTotalItems(data.totalItems);
        setIsLoading(false)
      }

    useEffect(() => {
        
        setIsLoading(true)
        setDomLoaded(true);
        loadPacs();

        setDomLoaded(true);


    }, [])

    async function findOne() {
        const data = await searchPacs(searchTerm);
        const dataArray = data.items
        setPacs(dataArray)
        console.log(data)
    }

    const loadNewPage = async (page) => {
        const data = await getPacs(page);
        setPacs(data.items);
        setCurrentPage(page);
    }
    
    return(
        <div className={``}>
            <div className={`flex gap-12 flex-col px-5 py-12 md:px-16 dark:bg-gray-800 dark:text-white`}>    
                <h1 className="text-4xl font-light">Pacientes</h1>
                <div className="flex gap-2 w-full ">    
                        <BiSearchAlt
                        className="text-2xl mt-2"
                        />
                        <input
                        type="text"
                        placeholder="Search by name"
                        className="p-2  w-full bg-zinc-100 dark:bg-gray-600 rounded-lg text-zinc-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={()=>{findOne()}}
                        className="bg-blue-600 p-3 text-white rounded-xl dark:bg-gray-900">Buscar</button>
                        <button onClick={async () => { await loadPacs()}}>
                            <BiRefresh className="text-4xl text-slate-600 dark:text-gray-900"></BiRefresh>
                        </button>
                </div>
                {isLoading ? 
                    <LoadingScreen></LoadingScreen> 
                    :
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <PacAddButton></PacAddButton>
                            {pacs.map((item) => (
                                <PatientTag key={item.id} id={item.id} nombre={item.nombre} apellidos={item.apellidos} edad={item.edad} sexo={item.sexo}
                                fecha_nac={item.fecha_nac.slice(0, 10)} curp={item.curp}></PatientTag>
                            ))}
                    </div>
                }
                <div className="flex justify-center gap-5 py-1">
                    <button className={`py-2 px-4 rounded flex ${
                    (currentPage == 1) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-primary-blue'
                    } text-white`}
                    onClick={() => {loadNewPage(currentPage-1)}} disabled={(currentPage == 1)}>
                        <MdOutlineNavigateBefore className="text-2xl text-white"></MdOutlineNavigateBefore>
                        Anterior
                    </button>
                    <button
                    className={`py-2 px-4 rounded flex ${
                        (currentPage == Math.ceil(totalItems/6)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-primary-blue'
                    } text-white`}
                     onClick={() => {loadNewPage(currentPage+1)}} disabled={(currentPage == Math.ceil(totalItems/6))}>
                        Siguiente
                        <MdOutlineNavigateNext className="text-2xl text-white"></MdOutlineNavigateNext>
                    </button>
                </div>
            </div>
        </div>
    )
}