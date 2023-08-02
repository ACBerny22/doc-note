'use client'

import Link from "next/link";
import {TbPills} from 'react-icons/tb'
import {CgPill} from 'react-icons/cg'
import {BiInjection} from 'react-icons/bi'
import {MdDelete, MdEdit} from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';

interface MedTagProps {
    id: string;
    nombre: string;
    gramaje: number;
    presentacion: string;
    indicaciones:string;
    // Add more props as needed
  }

  const confirmation = () => {
    toast((t) => (
      <div className="flex flex-col gap-5">
        <p className="font-light text-center">¿Esta seguro que quiere eliminar el medicamento?</p>
        <div className="flex gap-5 justify-center items-center">
          <button className="p-3 bg-red-500/80 text-white rounded-xl"
           onClick={() => toast.dismiss(t.id)}>
            Eliminar
          </button>
          <button className="p-3 bg-blue-500 text-white rounded-xl"
           onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
        </div>
      </div>
    ));
  }


  const MedTag: React.FC<MedTagProps> = ({ id, nombre, gramaje, presentacion, indicaciones }) => {
    return (
      <div className="flex shadow-lg rounded-xl bg-white hover:-translate-y-3 transition-all ease-out justify-between group">
        <div className="flex">
          <div className={`flex rounded-tl-lg rounded-bl-lg justify-center items-center p-3 
          ${presentacion === "Capsulas" ? "bg-green-600/70" : presentacion === "Tabletas" ? "bg-blue-600/90" :  
            presentacion === "Inyectable" ? "bg-orange-600/70" : "bg-accent-blue"}`}>
            {presentacion === "Tabletas" ? <TbPills className='text-3xl text-white'/> : 
              presentacion === "Capsulas" ? <CgPill className='text-3xl text-white'/> : <BiInjection className='text-3xl text-white'/>}
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <p className="font-medium text-lg mb-5">{nombre}</p>
            </div>
            <p className="font-light">Gramaje: <span className="font-medium text-slate-500">{gramaje} mg</span></p>
            <p className="font-light">Presentacion: <span className="font-medium text-slate-500">{presentacion}</span></p>
            <div className="mt-5">
              <p className="font-bold text-slate-700">{indicaciones}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 justify-center items-center p-2 text-slate-500/80">
          <button onClick={confirmation}>
            <MdDelete className="text-2xl child group-hover:text-red-500/80"/>
          </button>
          {indicaciones == null ?  <MdEdit className="text-2xl child group-hover:text-blue-500"/> :  null}
        </div>

      </div>
    );
  };

  export default MedTag;

  
