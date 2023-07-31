'use client'

import { getMeds, isUserValid } from "@/PocketBase/PocketBase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import MedTag from "@/components/MedTag";
import {BiSearchAlt} from 'react-icons/bi'
import {MdOutlineNavigateNext, MdOutlineNavigateBefore} from 'react-icons/md'
import MedAddButton from "@/components/MedAddButton";
import {MdAdd} from 'react-icons/md'


export default function Medicamentos(){
    
    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [meds, setMeds] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState();

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        async function loadMeds(){
          const data = await getMeds(currentPage);
          console.log(data.totalItems);
          setMeds(data.items);
          setTotalItems(data.totalItems);
        }

        loadMeds();

        return () => {
            console.log('Component unmounted');
            // You can cancel any ongoing tasks here, clear timers, subscriptions, etc.
          };
    }, [])

    const loadNewPage = async (page) => {
        const data = await getMeds(page);
        setMeds(data.items);
        setCurrentPage(page);
    }

    return(
        <>
        {domLoaded &&
        
            <div className="flex gap-16 flex-col p-5 md:px-16 font-poppins">
                <h1 className="text-4xl font-light">Medicamentos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <MedAddButton></MedAddButton>
                    {meds.map((item) => (
                        <MedTag key={item.id} id={item.id} nombre={item.nombre} gramaje={item.gramaje} 
                        presentacion={item.presentacion}></MedTag>
                    ))}
                </div>
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
        }
        </>
    )
}