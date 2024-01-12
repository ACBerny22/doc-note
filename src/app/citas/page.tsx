'use client'

import { FC, useState, useEffect } from 'react'
import {BiSearchAlt, BiRefresh} from 'react-icons/bi'
import { getCitas, getConsultas } from '@/PocketBase/PocketBase'
import { Cita } from '@/Procedimientos/interfaces'

interface ComponentProps {

}

const Component: FC<ComponentProps> = ({}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [citas, setCitas] = useState<Cita[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)

    async function load(){
        const data:any = await getCitas(currentPage, perPage)
        setCitas(data.items);
        console.log(data)
    }

    useEffect(() => {
        load();

    },[])

    return (
        <div className="flex flex-col gap-12 p-5 md:px-16">
            <h1 className="text-4xl font-light">Citas</h1>
            <div className="flex gap-2">
                <form className="flex gap-5 w-full">    
                        <BiSearchAlt
                        className="text-2xl mt-2"
                        />
                        <input
                        type="date"
                        required={true}
                        placeholder="Buscar por CURP"
                        className="p-2 w-full bg-zinc-100 dark:bg-gray-600 rounded-lg text-zinc-700 focus:outline-none"
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
            <div className='flex items-center justify-center h-full font-bold'>
                {/*citas.map((item) => (<div key={item.id}>{item.id} {item.expand.paciente.nombre}</div>))*/}
                <h1>Coming Soon.</h1>
            </div>
        </div>
    )
}

export default Component



