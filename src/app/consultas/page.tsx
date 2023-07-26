'use client';

import { useEffect, useState } from "react";
import { getConsultas, isUserValid } from "@/PocketBase/PocketBase"
import ConsultaTag from '@/components/ConsultaTag'
import { useRouter } from "next/navigation";
import { Consulta } from "@/Procedimientos/interfaces";


export default function Consulta(){

    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [domLoaded, setDomLoaded] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if(!isUserValid){
            router.push('/login')
        }

        setDomLoaded(true);

        async function load(){
          const data:any = await getConsultas();
          setConsultas(data);
        }

        load();
    }, [])

    return(
        <div className="flex flex-col gap-10 m-10 font-poppins">
            <h1 className="text-4xl font-bold">Consultas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10">
                {consultas.map((item) => (
                    <ConsultaTag key={item.id} id={item.id} fecha={item.fecha} paciente={item.expand.paciente} isVerificada={item.isVerificada}></ConsultaTag>
                ))}
            </div>
        </div>
    )

}
