'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {useState, useEffect} from 'react'
import { getSinglePac, createConsulta, model } from '@/PocketBase/PocketBase'
import { Paciente } from '@/Procedimientos/interfaces'

interface ComponentProps {}

interface FormData {
    fecha: string;
    paciente: any;
    enfermedades: string;
    motivo_consulta: string;
    diagnostico:string;
    exp_fisica: string;
    isVerificada: boolean;
  }


const Component: FC<ComponentProps> = ({}) => {

    const router = useRouter()

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
        diagnostico:'',
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
          diagnostico:'',
          exp_fisica: '',
          isVerificada: false,
        });

        router.push('/consultas')
      };

    return (
      <div className='p-5'> 
        <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mt-8"
        >
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
            Fecha:
          </label>  
          <input
            required
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
            required
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
        <div className="mb-4">
          <label htmlFor="diagnostico" className="block text-gray-700 font-bold mb-2">
          Diagnóstico:
          </label>
          <input
            id="diagnostico"
            name="diagnostico"
            required={true}
            value={formData.diagnostico}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className='bg-blue-600 p-4 text-white font-semibold rounded-xl
        hover:bg-blue-700'
        >
          Crear
        </button>
      </form>
      </div>
    )
}

export default Component