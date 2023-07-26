'use client'

import { FC, use, useEffect, useState } from 'react'
import { getSingleConsulta, getTratamiento } from '@/PocketBase/PocketBase'
import {Consulta, Tratamiento} from '@/Procedimientos/interfaces'
import { formatDateToFullDate } from '@/Procedimientos/conversiones'
import MedTag from '@/components/MedTag'

const Component: FC = ({params} : any) => {
    
    const [consulta, setConsulta] = useState<Consulta>();
    const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);

    useEffect(()=>{
        async function load(){
            const data:any = await getSingleConsulta(params.id);
            const data2:any = await getTratamiento(params.id)
            setConsulta(data);
            setTratamiento(data2.items)
            console.log(data);
        }

        load();
    }, [])


    return (

    <div className='flex flex-col gap-20 m-10'>
        <div className='flex flex-col gap-5'>    
            <h1 className='text-3xl font-medium mb-10'>Consulta: {formatDateToFullDate(consulta?.fecha!)}</h1> 
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
        <div>
            <h1 className='text-3xl font-medium mb-10'>Tratamiento</h1>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-4'>
                {tratamiento.map((item) => (
                    <MedTag key={item.id} id={item.id} nombre={item.expand.medicamento.nombre} gramaje={item.expand.medicamento.gramaje} 
                    presentacion={item.expand.medicamento.presentacion} indicaciones={item.indicaciones}></MedTag>
                ))}
            </div>


        </div>

    </div>

    )
}

export default Component
