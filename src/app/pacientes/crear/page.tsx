'use client'

import { FC } from 'react'
import {useState} from 'react'
import { createPac, model } from '@/PocketBase/PocketBase'
import { Paciente } from '@/Procedimientos/interfaces'
import toast, { Toaster } from 'react-hot-toast';

interface FormValues {
  curp: string;
  nombre: string;
  apellidos: string;
  sexo: string;
  edad: number;
  fecha_nac: string,
  estado_civil: string;
}

const initialFormValues: FormValues = {
  curp: '',
  nombre: '',
  apellidos: '',
  sexo: '',
  fecha_nac: '',
  edad: 0,
  estado_civil: '',
};

const NewRecordForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can handle the form submission and save the new record to a database or perform other actions.
    console.log(formValues);
    await createPac(formValues, model?.id)
      .then(()=> toast.success('Paciente insertado con exito'))
      .catch(() => toast.error('Hubo un error en el registro'))
      .finally()
    // Reset the form after submission
    setFormValues(initialFormValues);
  };

  return (
    <div className='p-5'>
      <Toaster />
      <form onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-8">
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            CURP:
          </label>
          <input type="text" name="curp" value={formValues.curp} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Nombre:
          </label>
          <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} 
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"

          />
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Apellidos:
          </label>
          <input type="text" name="apellidos" value={formValues.apellidos} onChange={handleChange} 
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
           />
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Sexo:
          </label>
          <select
            name="sexo"
            value={formValues.sexo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Edad:
          </label>
          <input type="number" name="edad" value={formValues.edad} onChange={handleChange} 
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
           />
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Fecha de Nacimiento:
          </label>
          <input type="date" name="fecha_nac" value={formValues.fecha_nac} onChange={handleChange}
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
           />
        </div>
        <div  className="mb-4">
          <label htmlFor="curp" className="block text-gray-700 font-bold mb-2">
            Estado Civil:
          </label>
          <select
            name="estado_civil"
            value={formValues.estado_civil}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="C">C</option>
            <option value="S">S</option>
          </select>
        </div>
        <button type="submit" className='bg-blue-600 p-4 text-white font-semibold text-lg rounded-xl
        hover:bg-primary-blue'>Registrar</button>
      </form>
    </div>
  );
};

export default NewRecordForm;