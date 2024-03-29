'use client';

import { useEffect, useState } from "react";
import { getConsultas, searchConsultaByDate, isUserValid } from "@/PocketBase/PocketBase"
import ConsultaTag from '@/components/ConsultaTag'
import { useRouter } from "next/navigation";
import { Consulta } from "@/Procedimientos/interfaces";
import {BiSearchAlt, BiRefresh} from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast';


export default function ConsultaPage(){

    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [domLoaded, setDomLoaded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [childValue, setChildValue] = useState<string>('');

    const router = useRouter();

    async function load(){
       const data:any =  await getConsultas(currentPage, perPage)
       setConsultas(data.items);
    }

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        load();
    }, [])

    async function findOne() {
        const data:any = await searchConsultaByDate(searchTerm).catch(() => 
        toast.error("Fecha no valida")) as unknown as Consulta;
        const dataArray = [data]
        setConsultas(data)
        console.log(data)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await findOne();
    }


    return(
        <div className="flex flex-col gap-12 px-5 py-12 md:px-16">
            <Toaster />
            <h1 className="text-4xl font-light">Consultas</h1>
            <div className="flex gap-2">
                <form className="flex gap-5 w-full" onSubmit={handleSubmit}>    
                        <BiSearchAlt
                        className="text-2xl mt-2"
                        />
                        <input
                        type="date"
                        required={true}
                        placeholder="Buscar por CURP"
                        className="p-2  w-full bg-zinc-100 dark:bg-gray-600 rounded-lg 
                        text-zinc-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit"
                            className="bg-blue-600 p-3 text-white rounded-xl">Buscar
                        </button>
                </form>
                <button onClick={async () => { await load()}}>
                    <BiRefresh className="text-4xl text-blue-600"></BiRefresh>
                </button>
            </div>
      
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                { Object.prototype.toString.call(consultas[0]) === "[object Object]" ? ( consultas.map((item) => (
                    <ConsultaTag key={item.id} id={item.id} fecha={item.fecha} 
                    paciente={item.expand.paciente} isVerificada={item.isVerificada} />
                ))) : null}
            </div>
        </div>
    )

}
