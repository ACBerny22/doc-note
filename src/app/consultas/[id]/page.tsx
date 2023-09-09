'use client'

import { FC, use, useEffect, useState } from 'react'
import { getSingleConsulta, getTratamiento, model } from '@/PocketBase/PocketBase'
import {Consulta, Tratamiento} from '@/Procedimientos/interfaces'
import { formatDateToFullDate } from '@/Procedimientos/conversiones'
import TratAddButton from '@/components/TratAddButton'
import MedTagInfo from '@/components/MedTagInfo'
import { useRouter } from 'next/navigation'
import {GoUnverified, GoVerified} from 'react-icons/go'
import toast, { Toaster } from 'react-hot-toast';
import { verifyConsulta } from "@/PocketBase/PocketBase";

const Component: FC = ({params} : any) => {
    
    const [consulta, setConsulta] = useState<Consulta>();
    const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
    const [isVerificada, setIsVerificada] = useState<boolean>();
    const [addActive, setAddActive] = useState(false);

    const router = useRouter()

    useEffect(()=>{
        async function load(){
            const data:any = await getSingleConsulta(params.id);
            const data2:any = await getTratamiento(params.id)
            setConsulta(data);
            setTratamiento(data2.items)
            
            setIsVerificada(data.isVerificada)
            console.log(data);
            console.log(data.isVerificada)

            setAddActive(true)
        }

        load();
    }, [])

    const handleVerify = async () => {
        const res = await verifyConsulta(params.id)
        window.location.reload()
    }

    return (

    <div className='flex flex-col gap-16 p-10'>
        <Toaster></Toaster>
        <div className='flex gap-6'>
            <h1 className='text-3xl font-medium'>Consulta: {formatDateToFullDate(consulta?.fecha!)}</h1>
            <button onClick={handleVerify} disabled={isVerificada ? true : false}
            className='p-2 bg-emerald-500 text-white rounded-lg flex gap-2 hover:bg-emerald-600 transition-all disabled:bg-gray-400'>
                <GoVerified className='text-2xl'></GoVerified>
                <span className='text-lg'>{isVerificada ? "Verificada" : "Verificar"}</span>
            </button>
        </div>
        <div className='grid grid-flow-row lg:grid-cols-2 gap-16'>
            <div className='flex flex-col gap-7'> 
                <h1 className='text-2xl font-semibold'>Detalles:</h1>
                <div className='grid grid-flow-row gap-5'>
                    <div>
                        <h2 className='text-lg font-medium'>Paciente:</h2>
                        <p className='text-slate-700'>{consulta?.expand.paciente.nombre} {consulta?.expand.paciente.apellidos}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Motivo de Consulta:</h2>
                        <p className='text-slate-700'>{consulta?.motivo_consulta}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Exploracion Fisica:</h2>
                        <p className='text-slate-700'>{consulta?.exp_fisica}</p>
                    </div>
                </div>
            </div>    
            <div className='flex flex-col gap-7'>
                <h1 className='text-2xl font-semibold'>Somatometria:</h1>     
                <div className='grid grid-flow-col grid-rows-4 grid-cols-3 gap-5'>
                    <div>
                        <h2 className='text-lg font-medium'>Peso:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Talla:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>IMC:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Temperatura:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>FC:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>FR:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>TA:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>SO2:</h2>
                        <p className='text-slate-700'>000</p>
                    </div>                       
                </div>
            </div>
        </div>
        <div>
            <h1 className='text-3xl font-medium mb-10'>Tratamiento</h1>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-4'>
                {isVerificada ? null
                            : <TratAddButton id={params.id} isVerificada={isVerificada} isActive={addActive}></TratAddButton>}
                {tratamiento.map((item) => (
                    <MedTagInfo key={item.id} id={item.id} nombre={item.expand.medicamento.nombre} gramaje={item.expand.medicamento.gramaje} 
                    presentacion={item.expand.medicamento.presentacion} indicaciones={item.indicaciones}></MedTagInfo>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Component
