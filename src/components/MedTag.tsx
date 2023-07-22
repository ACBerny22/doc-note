import Link from "next/link";

interface MedTagProps {
    id: string;
    nombre: string;
    gramaje: string;
    presentacion: string;
    // Add more props as needed
  }


  const MedTag: React.FC<MedTagProps> = ({ id, nombre, gramaje, presentacion }) => {
    return (
      <Link href={`medicamentos/${id}`} className="shadow-lg p-10 font-light rounded-xl hover:shadow-xl transition-all">
        <p className="font-bold text-xl mb-5">{nombre}</p>
        <p>Gramaje: <span className="font-medium text-slate-500">{gramaje} mg</span></p>
        <p>Presentacion: <span className="font-medium text-slate-500">{presentacion}</span></p>
      </Link>
    );
  };

  export default MedTag;

  
