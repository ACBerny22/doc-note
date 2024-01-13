'use client'

import React, { useState } from 'react';
import { addMeds } from '@/PocketBase/PocketBase';
import { useRouter } from 'next/navigation';

interface Medicamento {
  nombre: string;
  gramaje: number;
  presentacion: string;
}

const MedicamentoForm = () => {

  const router = useRouter()

  const [medicamento, setMedicamento] = useState<Medicamento>({
    nombre: '',
    gramaje: 0,
    presentacion: 'Tabletas',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMedicamento((prevMedicamento) => ({
      ...prevMedicamento,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del medicamento:', medicamento);
    await addMeds(medicamento)

    // También puedes resetear el formulario si lo deseas.
    setMedicamento({ nombre: '', gramaje: 0, presentacion: 'Tabletas' });
    router.push('/medicamentos')
  };

  return (
    <div className='p-5'>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
        <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
            Nombre:
            </label>
            <input
            type="text"
            id="nombre"
            name="nombre"
            value={medicamento.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="gramaje" className="block text-gray-700 font-bold mb-2">
            Gramaje:
            </label>
            <input
            type="text"
            id="gramaje"
            name="gramaje"
            value={medicamento.gramaje}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="presentacion" className="block text-gray-700 font-bold mb-2">
            Presentación:
            </label>
            <select
              id="presentacion"
              name="presentacion"
              value={medicamento.presentacion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              {/* Add your options here */}
              <option value="Tabletas">Tabletas</option>
              <option value="Sol. Iny.">Sol. Iny.</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Cápsulas">Cápsulas</option>
              <option value="Polvo">Polvo</option>
              <option value="Spray Nasal">Spray Nasal</option>
              <option value="Otro">Otro</option>

              {/* Add more options as needed */}
            </select>
        </div>
        <button
            type="submit"
            className='bg-blue-600 p-4 text-white font-semibold rounded-xl
            hover:bg-blue-700'
            >
            Guardar
        </button>
        </form>
    </div>
  );
};

export default MedicamentoForm;
