'use client'

import { getSinglePac, isUserValid, searchConsultaPerPaciente } from "@/PocketBase/PocketBase"
import {useEffect, useState} from 'react'
import { formatDateToFullDate } from "@/Procedimientos/conversiones"
import { Paciente, Consulta } from "@/Procedimientos/interfaces"
import {HiDocumentAdd} from 'react-icons/hi'
import Link from "next/link"
import { useRouter } from "next/navigation"

interface pageProps {
    params:{
        id:string
    }
}

export default function Pacientes({params} : pageProps){

    const router = useRouter();

    const[paciente, setPaciente] = useState<Paciente>();
    const[consultas, setConsultas] = useState<Consulta[]>([]);

    async function load(){
        const data:any = await getSinglePac(params.id);
        setPaciente(data);

        const data2:any = await searchConsultaPerPaciente(params.id);
        console.log(data2)
        setConsultas(data2)
    }

    useEffect(() => {
        load();
    }, [])

    if(!isUserValid) {
        router.push('/')
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 lg:p-10">
            <div className="flex flex-col gap-10 p-12 rounded-xl shadow-xl">
                <h1 className="text-3xl font-semibold">{paciente?.nombre} {paciente?.apellidos}</h1>
                <div className="flex gap-2 text-lg">
                    <p className="font-light">CURP:</p>
                    <p className="font-semibold text-slate-700">{paciente?.curp}</p>
                </div>
                <div className="flex gap-2  text-lg">
                    <p className="font-light">Edad:</p>
                    <p className="font-semibold text-slate-700">{paciente?.edad}</p>
                </div>
                <div className="flex gap-2  text-lg">
                    <p className="font-light">Fecha de Nacimiento:</p>
                    <p className="font-semibold text-slate-700">{paciente?.fecha_nac.slice(0,10)}</p>
                </div>
                <div className="flex gap-2  text-lg">
                    <p className="font-light">Sexo:</p>
                    <p className="font-semibold text-slate-700">{paciente?.sexo}</p>
                </div>
                <div className="flex gap-2 text-lg">
                    <p className="font-light">Estado Civil:</p>
                    <p className="font-semibold text-slate-700">{paciente?.estado_civil}</p>
                </div>
                <div className="flex gap-10">
                    <button className="p-3 rounded-lg bg-blue-600 text-white">Editar</button>
                    <button className="p-3 rounded-lg bg-red-500/90 text-white">Eliminar</button>
                </div>
               
            </div>
            <div className="flex flex-col gap-10 p-8 rounded-xl shadow-xl">
                <h1 className="font-semibold text-xl">Consultas</h1>
                <Link className="flex items-center gap-3 justify-center rounded-xl bg-blue-600 hover:bg-blue-700
                transition-all p-5 text-white font-bold" 
                href={{
                    pathname:'/consultas/crear',
                    query:{idPac: params.id}
                    }}>
                        <HiDocumentAdd className="text-2xl"></HiDocumentAdd>
                    Crear nueva consulta
                </Link>
                {consultas.length > 0 ? (
                    <>
                        {consultas.map((item) => (
                        <div key={item.id} className='shadow-lg p-3 rounded-xl'>
                            <p className="text-lg">{formatDateToFullDate(item.fecha.slice(0,10))}</p>
                            <p className="text-sm text-slate-500 font-light">{item.id}</p>
                            <div className="mt-5 text-sm text-blue-400 underline">
                                <Link href={`/consultas/${item.id}`}>Ver detalles</Link>
                            </div>
                        </div>
                        ))}

                    </>

                ) : (
                        <div className="max-w-sm mx-auto font-bold text-xl text-slate-500">
                            No existen consultas.
                        </div>
                )}
               
            </div>
        </div>
    )
}