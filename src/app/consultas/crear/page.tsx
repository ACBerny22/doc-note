'use client'

import { FC } from 'react'
import { useSearchParams } from 'next/navigation'
import {useState, useEffect} from 'react'
import { getSinglePac, createConsulta, model } from '@/PocketBase/PocketBase'
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
        await createConsulta(formData, model?.id);
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
        className="max-w-md mx-auto mt-8 p-4"
      >
        <h1 className='text-center my-10 text-2xl font-bold'>Nueva Consulta</h1>
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
            Fecha:
          </label>  
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paciente" className="block text-gray-700 font-bold mb-2">
            Paciente:
          </label>
          <input
            type="text"
            id="paciente"
            name="paciente"
            value={formData.paciente}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="enfermedades" className="block text-gray-700 font-bold mb-2">
            Enfemedades:
          </label>
          <input
            type="text"
            id="enfermedades"
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="motivo_consulta" className="block text-gray-700 font-bold mb-2">
            Motivo de Consulta:
          </label>
          <textarea
            id="motivo_consulta"
            name="motivo_consulta"
            required={true}
            value={formData.motivo_consulta}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exp_fisica" className="block text-gray-700 font-bold mb-2">
            Exploración Física:
          </label>
          <textarea
            id="exp_fisica"
            name="exp_fisica"
            required={true}
            value={formData.exp_fisica}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className='bg-blue-600 p-4 text-white font-semibold text-lg rounded-xl
        hover:bg-blue-700'
        >
          Crear
        </button>
      </form>
    )
}

export default Component