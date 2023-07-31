'use client'

import { FC } from 'react'
import {useState} from 'react'
import { createPac } from '@/PocketBase/PocketBase'
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    await createPac(formValues)
      .then(()=> toast.success('Paciente insertado con exito'))
      .catch(() => toast.error('Hubo un error en el registro'))
      .finally()
    // Reset the form after submission
    setFormValues(initialFormValues);
  };

  return (
    <div className='flex flex-col gap-10 items-center justify-center font-poppins mt-10'>
      <Toaster />
      <h1 className='font-bold text-2xl'>Registrar nuevo paciente</h1>
      <form onSubmit={handleSubmit}
      className={'flex flex-col gap-3 '}>
        <div>
          <input type="text" name="curp" value={formValues.curp} onChange={handleChange} placeholder='CURP'
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div>
          <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder='Nombre'
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"

          />
        </div>
        <div>
          <input type="text" name="apellidos" value={formValues.apellidos} onChange={handleChange} placeholder='Apelldios'
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
           />
        </div>
        <div>
          <input type="text" name="sexo" value={formValues.sexo} onChange={handleChange} placeholder='Sexo'
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
           />
        </div>
        <div>
          <input type="number" name="edad" value={formValues.edad} onChange={handleChange} placeholder='Edad'
          className='p-4 text-lg border-2 focus:border-accent-blue focus:outline-none focus:ring-blue-500 rounded-xl'
          />
        </div>
        <div>
          <input type="date" name="fecha_nac" value={formValues.fecha_nac} onChange={handleChange}
          className='p-4 text-lg border-2 focus:border-accent-blue focus:outline-none focus:ring-blue-500 rounded-xl'
          />
        </div>
        <div>
          <input type="text" name="estado_civil" value={formValues.estado_civil} onChange={handleChange} placeholder='Estado Civil'
          className='p-4 text-lg border-2 focus:border-accent-blue focus:outline-none focus:ring-blue-500 rounded-xl'
          />
        </div>
        <button type="submit" className='bg-accent-blue p-4 text-white font-semibold text-lg rounded-xl
        hover:bg-primary-blue'>Registrar</button>
      </form>
    </div>
  );
};

export default NewRecordForm;