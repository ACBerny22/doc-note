'use client'

import Link from "next/link";
import {TbPills} from 'react-icons/tb'
import {CgPill} from 'react-icons/cg'
import {BiInjection} from 'react-icons/bi'
import { useState } from "react";
import { FaBottleDroplet } from "react-icons/fa6";


interface MedTagProps {
    id: string;
    nombre: string;
    gramaje: string;
    presentacion: string;
    indicaciones:string;
    onChildValueChange: (value: string) => void; // Callback function prop type

    // Add more props as needed
  }


  const MedTag: React.FC<MedTagProps> = ({ id, nombre, gramaje, presentacion, indicaciones, onChildValueChange }) => {

    const [isClicked, setIsClicked] = useState<boolean>(false);

    
    const handleClick = () => {

      setIsClicked(!isClicked);

      // Call the onClickTag callback function with the id value
      if(!isClicked){
        onChildValueChange(id);
      }
      else{
        onChildValueChange('')
      }

    };

    return (
      <div onClick={handleClick} 
        className={`flex shadow-lg rounded-xl bg-white hover:-translate-y-3 transition-all ease-out  border-4	 ${
          isClicked ? 'border-green-500' : 'border-gray-300'
        }`}>
        <div className={`flex rounded-tl-lg rounded-bl-lg justify-center items-center p-3 
          ${presentacion === "Cápsulas" ? "bg-green-600/70" : presentacion === "Tabletas" ? "bg-blue-600/90" :  
          presentacion === "Sol. Iny." ? "bg-orange-600/70" : 
          (presentacion === "Suspensión" || presentacion === "Jarabe") ? "bg-purple-600/70" : "bg-blue-600/90"}`}>
          {presentacion === "Tabletas" ? <TbPills className='text-3xl text-white'/> : 
            presentacion === "Cápsulas" ? <CgPill className='text-3xl text-white'/> :
            (presentacion === "Suspensión" || presentacion === "Jarabe")  ? <FaBottleDroplet className='text-3xl text-white'/> : 
            <BiInjection className='text-3xl text-white'/>}
          </div>
        <div className="p-5">
          <p className="font-medium text-xl mb-5">{nombre}</p>
          <p>Gramaje: <span className="font-medium text-slate-500">{gramaje} mg</span></p>
          <p>Presentacion: <span className="font-medium text-slate-500">{presentacion}</span></p>
          <div className="mt-5">
            <p className="font-bold text-slate-700">{indicaciones}</p>
          </div>
        </div>
      </div>
    );
  };

  export default MedTag;

  
