'use client'

import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFilteredMeds, createTratamiento } from '@/PocketBase/PocketBase'
import { Medicamento } from '@/Procedimientos/interfaces'
import MedTag from '@/components/MedTagTrat'
import {MdDeleteForever} from "react-icons/md"
import { useRouter } from 'next/navigation'

interface ComponentProps {}

const Component: FC<ComponentProps> = ({}) => {


  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('idCons')
  const [meds, setMeds] = useState<Medicamento[]>([])
  const [searchWord, setSearchWord] = useState("");
  const [ind, setInd] = useState("");
  const [childValue, setChildValue] = useState<string>('');


  async function load(){
    const data:any = await getFilteredMeds(searchWord).catch(() => console.log("jss"));
    setMeds(data.items as Medicamento[]);
}

  const handleTagClick = async (idMed: string) => {
    console.log(`Clicked MedTag with id: ${idMed}`);
    console.log(`On Consult: ${id}`);
    setChildValue(idMed);

  };

  const handleSubmit = async(event: React.FormEvent) => { 
    event.preventDefault();
    await load();
  } 

  const handleReset = async () => {
    setChildValue('');
    setSearchWord('');
  }

  const handleSubmitTotal = async(event: React.FormEvent) => { 
    event.preventDefault();
    console.log("Vamos a insertar: " +  childValue);
    console.log("EN esta consulta: " +  id);
    console.log(ind);

    await createTratamiento(id, childValue, ind);
    router.push(`/consultas/${id}`)
  } 


  return (
    <div className='md:p-10'>  
      <h1 className='mx-10 text-3xl font-light'>Añadir Tratamiento</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='flex flex-col gap-10 m-10 '>
        <h1 className='text-xl font-medium'>Busqueda de Medicamentos</h1>
        <form onSubmit={handleSubmit}>   
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="flex gap-2">
              <input onChange={(e) => setSearchWord(e.target.value)}  value={searchWord}
              type="search" id="default-search" className=" w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar Medicamentos" required/>
              <button type="submit" className="text-white  right-2.5 bottom-2.5 bg-blue-600 hover:bg-primary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Buscar</button>
          </div>
        </form>
          {meds.map((item) => (
            <MedTag key={item.id} id={item.id} nombre={item.nombre} gramaje={item.gramaje} presentacion={item.presentacion} indicaciones={" "}
            onChildValueChange={handleTagClick}></MedTag>
          ))}
        </div>
        <div className='flex flex-col gap-10 m-10'>
          <div className='flex gap-10'>
            <h1 className='text-xl font-medium'>Indicaciones: {childValue} </h1> 
            <MdDeleteForever className='text-red-500/80 text-3xl' onClick={handleReset}></MdDeleteForever> 
          </div>
          <form className='flex flex-col gap-5' onSubmit={handleSubmitTotal}>
            <textarea id="message" rows={10} value={ind} onChange={(e) => setInd(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
            border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."/>
            <button type="submit" 
            className="text-white bg-blue-600 hover:bg-primary-blue focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-5  w-1/4">
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Component