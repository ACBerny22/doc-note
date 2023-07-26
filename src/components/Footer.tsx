import { FC } from 'react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className='bg-secondary-blue text-white text-center py-4 absolute w-full'>
        <p className='text-zinc-600'>&copy; {new Date().getFullYear()} DocNote</p>
    </div>

  )
}

export default Footer