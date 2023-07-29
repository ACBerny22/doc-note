'use client'


import { FC } from 'react'
import Link from 'next/link'
import {MdAdd} from 'react-icons/md'
import { useDarkStore } from "@/states/themeProvider";

interface PacAddButtonProps {
  
}

const PacAddButton: FC<PacAddButtonProps> = ({}) => {

  const {isDark, setIsDark} = useDarkStore()

  return (
    <div className={`${isDark ? 'dark' : ''} flex shadow-lg rounded-xl  items-center justify-center group 
     hover:-translate-y-3 transition-all ease-out hover:bg-slate-400 dark:hover:bg-gray-500`}>
      <Link href={'/pacientes/crear'} className={``}>
        <div className={` flex rounded-tl-lg rounded-bl-lg
         justify-center items-center p-10 child group-hover:text-white`}>
            <MdAdd className='text-5xl hover:rotate-90 '></MdAdd>
        </div>
      </Link>
    </div>
  )
}

export default PacAddButton