'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

interface DashCardProps {
    total: number,
    type: string,
    icon: ReactNode
    color:string,
}


const DashCard: FC<DashCardProps> = ({total, type, icon, color}) => {

    const [contador, setContador] = useState(0);

    useEffect(() => {
      if (contador < total) {
        const intervalId = setInterval(() => {
          setContador((prevContador) => prevContador + 1);
        }, 100);
  
        return () => clearInterval(intervalId);
      }
    }, [contador, total]);


  return (
    <div style={{backgroundColor: color}}className={`flex text-white rounded-2xl shadow-xl`}>
        <div className='flex p-5 justify-center items-center'>
            {icon} 
        </div>
        <div className='flex flex-col gap-5 p-5'>
            <h1 className='text-lg font-medium'>{type}:</h1>
            <p className='text-5xl font-extrabold'>{contador}</p>
        </div>
    </div>
  )
}

export default DashCard