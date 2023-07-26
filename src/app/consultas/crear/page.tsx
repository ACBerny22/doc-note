'use client'

import { FC } from 'react'
import { useSearchParams } from 'next/navigation'
import {useState, useEffect} from 'react'
import { getSinglePac, createConsulta } from '@/PocketBase/PocketBase'
import { Paciente } from '@/Procedimientos/interfaces'

interface ComponentProps {}

interface FormData {
    fecha: string;
    paciente: any;
    enfermedades: string;
    motivo_consulta: string;
    exp_fisica: string;
    isVerificada: boolean;
  }


const Component: FC<ComponentProps> = ({}) => {

    async function load(){
        const data:any = await getSinglePac(idPac);
        setPaciente(data);
    }

    useEffect(() => {
        load();
    }, [])

    const searchParams = useSearchParams()
    let idPac = searchParams.get('idPac')

    const[paciente, setPaciente] = useState<Paciente>();
    const [formData, setFormData] = useState<FormData>({
        fecha: '',
        paciente: idPac,
        enfermedades: '',
        motivo_consulta: '',
        exp_fisica: '',
        isVerificada: false,
      });

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Here you can submit the form data to your backend or perform other actions.
        console.log(formData);
        await createConsulta(formData);
        // Reset the form after submission
        setFormData({
          fecha: '',
          paciente: '',
          enfermedades: '',
          motivo_consulta: '',
          exp_fisica: '',
          isVerificada: false,
        });
      };



    return (
        <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 font-poppins"
      >
        <div className="mb-4">  
            <h1 className='text-center my-10 text-2xl font-bold'>Nueva Consulta</h1>
          
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          
          <input
            type="text"
            id="paciente"
            name="paciente"
            value={formData.paciente}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-5 focus:outline-none focus:border-blue-500" placeholder='Paciente'
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="enfermedades"
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-5 focus:outline-none focus:border-blue-500" placeholder='Enfermedades'
          />
        </div>
        <div className="mb-4">
          <textarea
            id="motivo_consulta"
            name="motivo_consulta"
            required={true}
            value={formData.motivo_consulta}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-5 focus:outline-none focus:border-blue-500" placeholder='Motivo de Consulta'
          />
        </div>
        <div className="mb-4">
          
          <textarea
            id="exp_fisica"
            name="exp_fisica"
            required={true}
            value={formData.exp_fisica}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-5 focus:outline-none focus:border-blue-500" placeholder='Exploracion Fisica'
          />
        </div>
        <button
          type="submit"
          className="bg-accent-blue text-white p-5 rounded hover:bg-primary-blue focus:outline-none w-full"
        >
          Submit
        </button>
      </form>
    )
}

export default Component