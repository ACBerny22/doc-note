import {RiWomenLine,RiMenLine} from 'react-icons/ri'

interface PatientTagProps {
    id: string
    nombre: string
    apellidos: string
    edad: number
    sexo: string

}

const PatientTag: React.FC<PatientTagProps> = ({id, nombre, apellidos, edad, sexo}) => {

    return(
        <div className='flex shadow-lg rounded-xl'>
            <div className={`flex p-3 rounded-tl-lg rounded-bl-lg justify-center items-center 
            ${sexo === "F"  ? "bg-pink-600" : "bg-blue-600"}`}>
            {sexo === "F" ? <RiWomenLine className='text-2xl text-white'></RiWomenLine> : <RiMenLine className='text-2xl text-white'/>}
            </div>
            <div className="flex justify-between rounded-xl">
                <div className="flex p-12 lex-col gap-6">    
                    <h1 className="text-xl font-medium">{nombre} {apellidos}</h1>
                    <h2 className="font-light">Edad: <span className="font-medium">{edad} años</span></h2>
                </div>
            </div>
        </div>
    )

}

export default PatientTag;

