import Link from "next/link";
import { formatDateToFullDate } from "@/Procedimientos/conversiones";
import { Paciente } from "@/Procedimientos/interfaces";
import {GoUnverified, GoVerified} from 'react-icons/go'


interface ConsultaTagProps {
    id: string;
    paciente: Paciente;
    fecha: string;
    isVerificada: boolean
}


const ConsultaTag: React.FC<ConsultaTagProps> = ({ id, paciente, fecha, isVerificada }) => {

    return(
        <Link className="flex shadow-lg rounded-xl bg-white hover:-translate-y-3 transition-all ease-out"
        href={`consultas/${id}`}>
            <div className={`flex items-center  rounded-tl-lg rounded-bl-lg ${isVerificada ? 'bg-green-500/70 px-5' : 'bg-yellow-500/70 px-5' }`}>
                {isVerificada ? <GoVerified className="text-white text-3xl"></GoVerified> : <GoUnverified  className="text-white text-3xl"></GoUnverified>}
            </div>
            <div className="flex flex-col gap-8 font-poppins p-10 rounded-2xl">
                <p className="font-medium text-xl">{paciente.nombre} {paciente.apellidos}</p>
                <p className="font-medium"><span className="text-slate-600">Fecha: </span>{formatDateToFullDate(fecha)}</p>
            </div>
        </Link>
    )

}

export default ConsultaTag;