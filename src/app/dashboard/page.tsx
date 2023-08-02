'use client'

import {isUserValid, model, getPacs, getMeds, getConsultas} from "../../PocketBase/PocketBase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import DashCard from "@/components/DashCard"
import { MdAccountCircle } from "react-icons/md"
import {FaChild, FaNotesMedical} from 'react-icons/fa'
import {GiMedicines} from 'react-icons/gi'
import ConsultaTagDash from '@/components/ConsultaTagDash'
import { Consulta } from "@/Procedimientos/interfaces"

export default function Dashboard(){

    const router = useRouter()
    const [domLoaded, setDomLoaded] = useState(false)
    const [totalPacs, setTotalPacs] = useState(0)
    const [totalMeds, setTotalMeds] = useState(0)
    const [totalCons, setTotalCons] = useState(0)

    const [consultas, setConsultas] = useState<Consulta[]>([])

    const [displayedPacs, setDisplayedPacs] = useState(0);

    const loadStats = async () => {
        const pacs = await getPacs(1)
        setTotalPacs(pacs.totalItems)

        const meds = await getMeds(1)
        setTotalMeds(meds.totalItems)        
        
        const cons:any = await getConsultas(1, 2)
        setTotalCons(cons.totalItems)
        setConsultas(cons.items)



    }

    useEffect(() => {
        setDomLoaded(true);
        loadStats();
    }, [])


    if(!isUserValid){
        router.push('/login')
    }
    
    return(
    <>
    {domLoaded && (
        
        <main className="p-5 md:p-16 flex flex-col gap-16">
            <h1 className="font-bold text-4xl">Bienvenido {model?.username}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <DashCard total={totalPacs} color={'#4f46e5'} type={"Pacientes"} icon={<FaChild className="text-5xl text-white"/>}></DashCard>
                <DashCard total={totalMeds} color={'#2563eb'} type={"Medicamentos"} icon={<GiMedicines className="text-5xl text-white"/>}></DashCard>
                <DashCard total={totalCons} color={'#14b8a6'} type={"Consultas"} icon={<FaNotesMedical className="text-5xl text-white"/>}></DashCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                <div className="flex flex-col gap-10 col-span-1 p-5 shadow-lg rounded-xl">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Consultas Recientes</h1>
                        <Link href={'/consultas'} className='font-light text-blue-600'>Ver todas</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        {
                            consultas.map((item) => (
                            <ConsultaTagDash key={item.id} id={item.id} fecha={item.fecha} paciente={item.expand.paciente} isVerificada={item.isVerificada}></ConsultaTagDash>))
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-10 xl:col-span-2 p-5 shadow-lg rounded-xl">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Consultas Recientes</h1>
                        <Link href={'/consultas'} className='font-light text-blue-600'>Ver todas</Link>
                    </div>
                        <div className="grid grid-cols-1 gap-5">
                            {
                                consultas.map((item) => (
                                <ConsultaTagDash key={item.id} id={item.id} fecha={item.fecha} paciente={item.expand.paciente} isVerificada={item.isVerificada}></ConsultaTagDash>))
                            }
                    </div>

                </div>
            </div>
        
            
        </main>

    )}
    </>
    )
}