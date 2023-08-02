import { env } from 'process'
import { FC } from 'react'
import Link from 'next/link'
import {MdAdd} from 'react-icons/md'

interface MedAddButtonProps {
  
}

const MedAddButton: FC<MedAddButtonProps> = ({}) => {


  return (
   <Link href={`/medicamentos/crear`} className="flex justify-center hover:bg-slate-400 group
   items-center shadow-lg rounded-xl bg-white hover:-translate-y-3 transition-all ease-out">
       <div className={` flex  rounded-tl-lg rounded-bl-lg p-10 child group-hover:text-white`}>
            <MdAdd className='text-5xl hover:rotate-90 '></MdAdd>
        </div>
    </Link>
  )
}

export default MedAddButton