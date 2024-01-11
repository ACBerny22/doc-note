'use client'

import { useEffect, useState } from 'react'
import { Document, Text, Page, View, Font, pdf } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import { Tratamiento, Consulta } from '@/Procedimientos/interfaces'
import { getSingleConsulta, getTratamiento } from '@/PocketBase/PocketBase'
import { useRouter } from 'next/navigation'


interface pageProps {
    params:{
        id:string
    }
}

interface DefaultComponentProps {
  consulta:Consulta
  tratamiento:Tratamiento[]
}

const DocumentComponent = ({consulta, tratamiento}: DefaultComponentProps) => {
  return(
    <Document title='receta'>
      <Page style={{padding:"50px", fontSize:15}} size={'LETTER'}>
        <View style={{display:'flex', alignItems:'center', gap:5, marginBottom:20}}>
          <Text>Dr.Manuel Mariño Solorzano</Text>
          <Text>Medico Cirujano</Text>
          <Text>Ced. Prof. 6524370</Text>
          <Text>Universidad del Norestse</Text>
        </View>
        <View style={{textAlign:"right"}}>
          <Text>{consulta?.fecha.slice(0,10)}</Text>
        </View>
        <View style={{display:"flex", flexDirection: "row", justifyContent:"space-between", marginTop:50, marginBottom:20}}>
          <Text>Paciente: {consulta?.expand.paciente.nombre} {consulta?.expand.paciente.apellidos}</Text>
          <Text>Edad: {consulta?.expand.paciente.edad} años</Text>
        </View>
        <View style={{marginBottom:50}}>
          <Text style={{textAlign:'right'}}>Dx. {consulta?.diagnostico}</Text>
        </View>
        <View style={{textAlign:"left"}}>
          {tratamiento.map((item) => (
            <View key={item.id}>
                <Text style={{marginBottom:5}}
                >{item.expand.medicamento.nombre} {item.expand.medicamento.presentacion} {item.expand.medicamento.gramaje} mg</Text>
                <Text style={{fontWeight:"bold", marginBottom:20}}>{item.indicaciones}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

const Component = ({params}:pageProps) => {
  const router = useRouter();

  const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
  const [consulta, setConsulta] = useState<Consulta>();
  const [client, setClient] = useState(false)

  async function load(){
    const tratData:any = await getTratamiento(params.id)
    const consData:any = await getSingleConsulta(params.id)

    setTratamiento(tratData.items)
    setConsulta(consData)

    console.log(tratData.items);
    console.log(consData)
    
  }

  useEffect(()=>{
    load()
    setClient(true)
  }, [])

  return (
    <div className=''>
      {client &&
        <div>
            <PDFViewer style={{width:"100%", height:"100vh"}}>
                <DocumentComponent consulta={consulta as Consulta} tratamiento={tratamiento} ></DocumentComponent>
            </PDFViewer>
        </div>
      }
    </div>

  )
}

export default Component