import { FC } from 'react'
import Link from 'next/link'
import {MdAdd} from 'react-icons/md'

interface PacAddButtonProps {
  
}

const PacAddButton: FC<PacAddButtonProps> = ({}) => {
  return (
    <Link href={'/pacientes/crear'} className='flex shadow-lg rounded-xl bg-white justify-center items-center hover:-translate-y-3 transition-all ease-out hover:bg-accent-blue group'>
    <div className={`flex rounded-tl-lg rounded-bl-lg justify-center items-center p-10 child group-hover:text-white`}>
        <MdAdd className='text-5xl hover:rotate-90 '></MdAdd>
    </div>
</Link>
  )
}

export default PacAddButton