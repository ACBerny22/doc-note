'use client';

import { useEffect, useState } from "react";
import { getConsultas, searchConsulta, isUserValid } from "@/PocketBase/PocketBase"
import ConsultaTag from '@/components/ConsultaTag'
import { useRouter } from "next/navigation";
import { Consulta } from "@/Procedimientos/interfaces";
import {BiSearchAlt, BiRefresh} from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast';
import { loadConsultas } from "@/server_actions/loads";


export default function ConsultaPage(){

    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [domLoaded, setDomLoaded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [childValue, setChildValue] = useState<string>('');

    const router = useRouter();



    async function load(){
       const data =  await loadConsultas()
       setConsultas(data);
    }

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        load();
    }, [])

    async function findOne() {
        const data = await searchConsulta(searchTerm) as unknown as Consulta;
        const dataArray = [data]
        setConsultas(dataArray)
        console.log(data)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await findOne();
    }


    return(
        <div className="flex flex-col gap-10 p-16 font-poppins">
            <Toaster />
            <h1 className="text-4xl font-light">Consultas</h1>
            <div className="flex gap-2">
                <form className="flex gap-5 w-full" onSubmit={handleSubmit}>    
                        <BiSearchAlt
                        className="text-2xl mt-2"
                        />
                        <input
                        type="text"
                        required={true}
                        placeholder="Buscar por CURP"
                        className="p-2  w-full bg-secondary-blue rounded-xl text-zinc-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit"
                            className="bg-accent-blue p-3 text-white rounded-xl">Buscar
                        </button>
                        
                </form>
                <button onClick={async () => { await load()}}>
                    <BiRefresh className="text-4xl text-accent-blue"></BiRefresh>
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10">
                {consultas.map((item) => (
                    <ConsultaTag key={item.id} id={item.id} fecha={item.fecha} paciente={item.expand.paciente} isVerificada={item.isVerificada}></ConsultaTag>
                ))}
            </div>
        </div>
    )

}
