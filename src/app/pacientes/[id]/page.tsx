'use client'

import { getSinglePac, isUserValid, searchConsultaByDate, searchConsultaByDateAndPaciente, searchConsultaPerPaciente } from "@/PocketBase/PocketBase"
import {useEffect, useState} from 'react'
import { formatDateToFullDate } from "@/Procedimientos/conversiones"
import { Paciente, Consulta } from "@/Procedimientos/interfaces"
import {HiDocumentAdd} from 'react-icons/hi'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdDelete, MdEdit } from "react-icons/md"
import toast from "react-hot-toast"

interface pageProps {
    params:{
        id:string
    }
}

export default function Pacientes({params} : pageProps){

    const router = useRouter();

    const[paciente, setPaciente] = useState<Paciente>();
    const[consultas, setConsultas] = useState<Consulta[]>([]);
    const [searchTerm, setSearchTerm] = useState('')

    async function load(){
        const data:any = await getSinglePac(params.id);
        setPaciente(data);

        const data2:any = await searchConsultaPerPaciente(params.id);
        console.log(data2.items)
        setConsultas(data2.items)
    }


    async function findOne() {
        const data:any = await searchConsultaByDateAndPaciente(searchTerm, params.id).catch(() => 
        toast.error("Fecha no valida")) as unknown as Consulta;
        setConsultas(data)
        console.log(data)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await findOne();
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
                    <button className="p-3 rounded-lg bg-blue-600 text-white flex gap-2">
                        <MdEdit className="text-xl"></MdEdit>
                        Editar
                    </button>
                    <button className="p-3 rounded-lg bg-red-500/90 text-white flex gap-2">
                        <MdDelete className="text-xl"></MdDelete>
                        Eliminar
                    </button>
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
                <form className="flex gap-5 w-full" onSubmit={handleSubmit}>
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
                {consultas.length > 0 ? (
                    <>
                        {consultas.map((item) => (
                        <div key={item.id} className='shadow-lg p-3 rounded-xl'>
                            <p className="text-lg">{formatDateToFullDate(item.fecha!)}</p>
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