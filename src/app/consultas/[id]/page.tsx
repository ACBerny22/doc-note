'use client'

import { FC, useEffect, useState } from 'react'
import { getSingleConsulta, getSomatometria, getTratamiento, model } from '@/PocketBase/PocketBase'
import {Consulta, Somatometria, Tratamiento} from '@/Procedimientos/interfaces'
import { formatDateToFullDate } from '@/Procedimientos/conversiones'
import TratAddButton from '@/components/TratAddButton'
import MedTagInfo from '@/components/MedTagInfo'
import { useRouter } from 'next/navigation'
import {GoUnverified, GoVerified} from 'react-icons/go'
import toast, { Toaster } from 'react-hot-toast';
import LoadingScreen from '@/components/LoadingScreen'
import { verifyConsulta } from "@/PocketBase/PocketBase";
import Link from 'next/link'
import { GrAddCircle } from 'react-icons/gr'
import { BiEdit } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'

const Component: FC = ({params} : any) => {
    
    const [consulta, setConsulta] = useState<Consulta>();
    const [domLoaded, setDomLoaded] = useState(false)
    const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
    const [somatometria, setSomatometria] = useState<Somatometria>();
    const [isVerificada, setIsVerificada] = useState<boolean>(false);
    const [addActive, setAddActive] = useState<boolean>(false);
    const [exists, setExists] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        async function load(){
            const data:any = await getSingleConsulta(params.id);
            const data2:any = await getTratamiento(params.id)

            try{
                const data3:any = await getSomatometria(params.id)
                setSomatometria(data3)
                console.log(data3);
                setExists(true)
            }catch(error){
                console.log("Not yet!!")
            }

            setConsulta(data);
            setTratamiento(data2.items)

            setIsVerificada(data.isVerificada)
            console.log(data.isVerificada)

            setAddActive(true)
            setDomLoaded(true);

        }
        //console.log(exists)
        setIsVerificada(true)
        load();

    }, [])

    const handleVerify = async () => {
        const res = await verifyConsulta(params.id)
        window.location.reload()
    }

    return (
    <>
    
    {domLoaded ?
    <div className='flex flex-col gap-16 p-10'>
        <Toaster></Toaster>
        <div className='flex flex-col md:flex-row gap-5'>
            <div>
                <h1 className='text-3xl font-medium'>Consulta: {formatDateToFullDate(consulta?.fecha!)}</h1>
            </div>
            <div>
                <button onClick={handleVerify} disabled={isVerificada ? true : false}
                className='py-1 px-3 bg-red-500 text-white rounded-lg flex gap-2 hover:bg-red-600 transition-all disabled:bg-green-400'>
                    <GoVerified className='text-2xl'></GoVerified>
                    <span className='text-lg'>{isVerificada ? "Verificada" : "No Verificada"}</span>
                </button>
            </div>
        </div>
        <div className='grid grid-flow-row xl:grid-cols-3 gap-16'>
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
                    <div>
                        <h2 className='text-lg font-medium'>Diagnostico:</h2>
                        <p className='text-slate-700'>{consulta?.diagnostico}</p>
                    </div>
                </div>
            </div>    
            <div className='flex flex-col gap-7'>
                <div className='flex gap-5'>
                    <h1 className='text-2xl font-semibold'>Somatometria:</h1>
                    {!isVerificada && !exists &&
                    <Link href={{pathname:'/somatometria/crear', query:{consID: params.id}}} className='bg-blue-600 text-white p-2 rounded-lg flex gap-2'>
                        <MdAdd className='text-2xl text-white'></MdAdd>
                    </Link>
                    }
                    {
                        (!isVerificada && exists) && 
                        <Link href={{pathname:'/somatometria/editar', query:{somatID: somatometria?.id, consultaID: params.id}}} className='bg-blue-600 text-white p-2 rounded-lg flex gap-2'>
                            <BiEdit className='text-2xl text-white'></BiEdit>
                        </Link>
                    }
                </div>
                <div className='grid grid-flow-col grid-rows-4 grid-cols-3 gap-5'>
                    <div>
                        <h2 className='text-lg font-medium'>Peso:</h2>
                        <p className='text-slate-700'>{somatometria?.peso}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Talla:</h2>
                        <p className='text-slate-700'>{somatometria?.talla}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>IMC:</h2>
                        <p className='text-slate-700'>{somatometria?.imc}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>Temperatura:</h2>
                        <p className='text-slate-700'>{somatometria?.temperatura}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>FC:</h2>
                        <p className='text-slate-700'>{somatometria?.fc}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>FR:</h2>
                        <p className='text-slate-700'>{somatometria?.fr}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>TA:</h2>
                        <p className='text-slate-700'>{somatometria?.ta}</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium'>SO2:</h2>
                        <p className='text-slate-700'>{somatometria?.so2}</p>
                    </div>                       
                </div>
            </div>
            {isVerificada &&
            <div className='grid grid-col grid-rows-2 gap-10 p-20'>
                <Link href={
                    {
                        pathname:`/document/receta/${consulta?.id}`,
                    }
                } className='text-white p-4 rounded-lg bg-blue-600 text-center mt-1'>Generar Receta</Link>
                <Link href={
                    {
                        pathname:`/document/resumen/${consulta?.id}`,
                    }
                } className='text-white p-4 rounded-lg bg-blue-600 text-center mt-1'>Generar Resumen Clínico</Link>
            </div>
            }
        </div>
        <div>
            <h1 className='text-3xl font-medium mb-10'>Tratamiento</h1>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
                {!isVerificada && <TratAddButton id={params.id} isVerificada={isVerificada} isActive={addActive}></TratAddButton>}
                {tratamiento.map((item) => (
                    <MedTagInfo key={item.id} id={item.id} nombre={item.expand.medicamento.nombre} gramaje={item.expand.medicamento.gramaje} 
                    presentacion={item.expand.medicamento.presentacion} indicaciones={item.indicaciones}></MedTagInfo>
                ))}
            </div>
        </div>
    </div>
    : 
    <div className='p-40 flex items-center justify-center mx-auto'>
        <LoadingScreen/> 
    </div>
    }
    </>
    )
}

export default Component
