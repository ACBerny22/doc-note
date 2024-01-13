'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createSomat, editSomat, getSomatometria } from '@/PocketBase/PocketBase'
import { useSearchParams } from 'next/navigation'

interface SomatCreatePageProps {
  
}

export interface Somatometria{
    peso: number,
    talla: string,
    imc: number,
    temperatura: number,
    fc: number,
    fr: number,
    ta: number,
    so2: number,
    consulta: string
  }
  

export default function SomatEditPage({}){

    const router = useRouter()
    const searchParams = useSearchParams()
    let consID = searchParams.get('consultaID')
    let somatID = searchParams.get('somatID')

    const [somatometria, setSomatometria] = useState<Somatometria>({
        peso: 0,
        talla: '',
        imc: 0,
        temperatura: 0,
        fc: 0,
        fr: 0,
        ta: 0,
        so2: 0,
        consulta: '0'
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSomatometria((prevSomat) => ({
        ...prevSomat,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Datos de la somat:', somatometria);
      await editSomat(somatometria, somatID)
  
      // También puedes resetear el formulario si lo deseas.
      setSomatometria({
        peso: 0,
        talla: '',
        imc: 0,
        temperatura: 0,
        fc: 0,
        fr: 0,
        ta: 0,
        so2: 0,
        consulta: ''
    });
      router.push(`/consultas/${consID}`)
    };

    useEffect(() => {
      async function load(){
        const data3:any = await getSomatometria(consID)
        console.log(data3)

        setSomatometria({
          peso: data3.peso,
          talla: data3.talla,
          imc: data3.imc,
          temperatura: data3.temperatura,
          fc: data3.fc,
          fr: data3.fr,
          ta: data3.ta,
          so2: data3.so2,
          consulta: consID as string
      });

      }
      load() 
    },[])


    return (
    <div className='p-5'>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <div className="mb-4">
          <label htmlFor="peso" className="block text-gray-700 font-bold mb-2">
          Peso (KG):
          </label>
          <input
          type="number"
          id="peso"
          name="peso"
          value={somatometria.peso}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="talla" className="block text-gray-700 font-bold mb-2">
          Talla:
          </label>
          <input
          type="string"
          id="talla"
          name="talla"
          value={somatometria.talla}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="imc" className="block text-gray-700 font-bold mb-2">
          IMC:
          </label>
          <input
          type="number"
          id="imc"
          name="imc"
          value={somatometria.imc}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="temperatura" className="block text-gray-700 font-bold mb-2">
          Temperatura:
          </label>
          <input
          type="number"
          id="temperatura"
          name="temperatura"
          value={somatometria.temperatura}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="fc" className="block text-gray-700 font-bold mb-2">
          FC:
          </label>
          <input
          type="number"
          id="fc"
          name="fc"
          value={somatometria.fc}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="fr" className="block text-gray-700 font-bold mb-2">
          FR:
          </label>
          <input
          type="number"
          id="fr"
          name="fr"
          value={somatometria.fr}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="ta" className="block text-gray-700 font-bold mb-2">
          TA:
          </label>
          <input
          type="number"
          id="ta"
          name="ta"
          value={somatometria.ta}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <div className="mb-4">
          <label htmlFor="so2" className="block text-gray-700 font-bold mb-2">
          SO2:
          </label>
          <input
          type="number"
          id="so2"
          name="so2"
          value={somatometria.so2}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
          />
      </div>
      <button
          type="submit"
          className='bg-blue-600 p-4 text-white font-semibold rounded-xl
          hover:bg-blue-700 w-full'
          >
          Guardar
      </button>
      
      </form>
    </div>
    )
}
