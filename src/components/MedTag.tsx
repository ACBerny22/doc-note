import Link from "next/link";
import {TbPills} from 'react-icons/tb'
import {CgPill} from 'react-icons/cg'
import {BiInjection} from 'react-icons/bi'

interface MedTagProps {
    id: string;
    nombre: string;
    gramaje: number;
    presentacion: string;
    indicaciones:string;
    // Add more props as needed
  }


  const MedTag: React.FC<MedTagProps> = ({ id, nombre, gramaje, presentacion, indicaciones }) => {
    return (
      <Link href={`/medicamentos/${id}`} className="flex shadow-lg rounded-xl bg-white hover:-translate-y-3 transition-all ease-out">
        <div className={`flex rounded-tl-lg rounded-bl-lg justify-center items-center p-3 
        ${presentacion === "Capsulas" ? "bg-green-600/70" : presentacion === "Tabletas" ? "bg-accent-blue" :  
          presentacion === "Inyectable" ? "bg-orange-600/70" : "bg-accent-blue"}`}>
          {presentacion === "Tabletas" ? <TbPills className='text-3xl text-white'/> : 
            presentacion === "Capsulas" ? <CgPill className='text-3xl text-white'/> : <BiInjection className='text-3xl text-white'/>}
        </div>
        <div className="p-5">
          <p className="font-medium text-xl mb-5">{nombre}</p>
          <p>Gramaje: <span className="font-medium text-slate-500">{gramaje} mg</span></p>
          <p>Presentacion: <span className="font-medium text-slate-500">{presentacion}</span></p>
          <div className="mt-5">
            <p className="font-bold text-slate-700">{indicaciones}</p>
          </div>
        </div>
        
        
      </Link>
    );
  };

  export default MedTag;

  
