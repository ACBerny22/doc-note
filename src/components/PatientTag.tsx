'use client'

import {RiWomenLine,RiMenLine} from 'react-icons/ri'
import Link from 'next/link'
import { useDarkStore } from '@/states/themeProvider'

interface PatientTagProps {
    id: string
    nombre: string
    apellidos: string
    edad: number
    sexo: string
    curp:string
}


const PatientTag: React.FC<PatientTagProps> = ({id, nombre, apellidos, edad, sexo, curp}) => {

    const {isDark} = useDarkStore()

    return(
        <Link href={`/pacientes/${id}`} className={`${isDark ? 'dark' : '' } hover:-translate-y-3 transition-all ease-out`}>
            <div className='flex shadow-lg rounded-xl bg-white dark:bg-gray-700'>
                <div className={`flex p-4 rounded-tl-lg rounded-bl-lg justify-center items-center 
                ${sexo === "F"  ? "bg-pink-600/70" : "bg-blue-600/90"}`}>
                {sexo === "F" ? <RiWomenLine className='text-3xl text-white'></RiWomenLine> : <RiMenLine className='text-3xl text-white'/>}
                </div>
                <div className="flex justify-between rounded-xl dark:text-white">
                    <div className="flex p-8 flex-col gap-4">    
                        <h1 className="text-lg font-medium">{nombre} {apellidos}</h1>
                        <p className="text-sm font-light">{curp}</p>
                        <h2 className="font-light">Edad: <span className="font-medium">{edad} años</span></h2>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default PatientTag;

