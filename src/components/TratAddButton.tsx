import { FC } from 'react'
import Link from 'next/link'
import {MdAdd} from 'react-icons/md'

interface TratAddButtonProps {
  id:string
}

const TratAddButton: FC<TratAddButtonProps> = ({id}) => {
    return (
        <div>
            <Link href={{
                    pathname:'/tratamiento/crear',
                    query:{idCons: id}
                    }} 
                    className='flex shadow-lg rounded-xl bg-white justify-center items-center hover:-translate-y-3 transition-all ease-out hover:bg-slate-400 group'>
                <div className={`flex rounded-tl-lg rounded-bl-lg justify-center items-center p-10 child group-hover:text-white`}>
                    <MdAdd className='text-5xl hover:rotate-90 '></MdAdd>
                </div>
            </Link>
        </div>
    )
}

export default TratAddButton