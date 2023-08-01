'use client'

import React, { useState } from 'react';
import { addMeds } from '@/PocketBase/PocketBase';

interface MedicamentoFormProps {
  onSubmit: (medicamento: Medicamento) => void;
}

interface Medicamento {
  nombre: string;
  gramaje: number;
  presentacion: string;
}

const MedicamentoForm: React.FC<MedicamentoFormProps> = ({ onSubmit }) => {
  const [medicamento, setMedicamento] = useState<Medicamento>({
    nombre: '',
    gramaje: 0,
    presentacion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setMedicamento({ nombre: '', gramaje: 0, presentacion: '' });
  };

  return (
    <div className='font-poppins'>
        <h1 className='mx-auto'>Registrar nuevo medicamento</h1>
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
            type="number"
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
            <input
            type="text"
            id="presentacion"
            name="presentacion"
            value={medicamento.presentacion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
            Guardar
        </button>
        </form>
    </div>
  );
};

export default MedicamentoForm;
