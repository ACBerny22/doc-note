'use client'

import { getSinglePac } from "@/PocketBase/PocketBase"
import {useEffect, useState} from 'react'
import { Paciente } from "@/Procedimientos/interfaces"
import Link from "next/link"

interface pageProps {
    params:{
        id:string
    }
}

export default function Pacientes({params} : pageProps){

    const[paciente, setPaciente] = useState<Paciente>();

    async function load(){
        const data:any = await getSinglePac(params.id);
        setPaciente(data);
    }

    useEffect(() => {
        load();
    }, [])

    return(
        <div className="flex m-10 font-poppins">
            <div className="flex flex-col gap-10">
                <p>{paciente?.nombre} {paciente?.apellidos}</p>
                <Link className=" flex items-center justify-center rounded-xl bg-accent-blue p-5 text-white font-bold" 
                href={{
                    pathname:'/consultas/crear',
                    query:{idPac: params.id}
                    }}>
                    Nueva Consulta
                </Link>
            </div>
        </div>
    )
}