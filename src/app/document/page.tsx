'use client'

import { FC, useEffect, useState } from 'react'
import { Document, Text, Page, View } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import { useSearchParams } from 'next/navigation'
import { Tratamiento } from '@/Procedimientos/interfaces'
import { getTratamiento } from '@/PocketBase/PocketBase'

interface DefaultComponentProps {
  consulta:any
  tratamiento:Tratamiento[]
}

const DocumentComponent = ({consulta, tratamiento}: DefaultComponentProps) => {
  return(
    <Document>
      <Page style={{padding:"20px"}}>
        <View style={{textAlign:"center"}}>
          <Text>Hello</Text>
          <Text>{consulta}</Text>
          <Text>{}</Text>
          <Text>Hello</Text>
        </View>
      </Page>
    </Document>

  )
}

const Component: FC = ({}) => {

  const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
  const [client, setClient] = useState(false)

  const searchParams = useSearchParams()
  let idConsulta = searchParams.get('idConsulta')

  useEffect(()=>{
    async function load(){
      const trat:any = await getTratamiento(idConsulta)
      setTratamiento(trat.items)
      console.log(tratamiento);
      
    }
    load()
    setClient(true)
  }, [])

  return (
    <div className='flex justify-center'>
      {client &&
      <div>
        <PDFViewer style={{width:"100%", height:"100vh"}}>
          <DocumentComponent consulta={idConsulta} tratamiento={tratamiento}></DocumentComponent>
        </PDFViewer>
      </div>
      }
    </div>

  )
}

export default Component