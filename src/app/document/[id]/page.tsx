'use client'

import { FC, useEffect, useState } from 'react'
import { Document, Text, Page, View } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import { useSearchParams } from 'next/navigation'
import { Tratamiento, Medicamento } from '@/Procedimientos/interfaces'
import { getTratamiento } from '@/PocketBase/PocketBase'
import { useRouter } from 'next/navigation'

interface pageProps {
    params:{
        id:string
    }
}

interface DefaultComponentProps {
  consulta:any
  tratamiento:Tratamiento[]
}

const DocumentComponent = ({consulta, tratamiento}: DefaultComponentProps) => {
  return(
    <Document>
      <Page style={{padding:"20px"}}>
        <View style={{textAlign:"left"}}>
          {tratamiento.map((item) => (
            <View>
                <Text>{item.expand.medicamento.nombre}</Text>
                <Text style={{fontWeight:"bold"}}>{item.indicaciones + "\n\n"}</Text>
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
  const [client, setClient] = useState(false)

  async function load(){
    const data:any = await getTratamiento(params.id)
    setTratamiento(data.items)
    console.log(data.items);
    
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
                <DocumentComponent consulta={params.id} tratamiento={tratamiento}></DocumentComponent>
            </PDFViewer>
        </div>
      }
    </div>

  )
}

export default Component