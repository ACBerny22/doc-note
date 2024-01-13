'use client'

import { useEffect, useState } from 'react'
import { Document, Text, Page, View, Font, pdf } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import { Tratamiento, Consulta, Somatometria } from '@/Procedimientos/interfaces'
import { getSingleConsulta, getSomatometria, getTratamiento } from '@/PocketBase/PocketBase'
import { useRouter } from 'next/navigation'
import { formatDateToFullDate } from '@/Procedimientos/conversiones'

interface pageProps {
    params:{
        id:string
    }
}

interface DefaultComponentProps {
  consulta:Consulta
  tratamiento:Tratamiento[]
  somatometria:Somatometria
}

const DocumentComponent = ({consulta, tratamiento, somatometria}: DefaultComponentProps) => {
  return(
    <Document title='receta'>
      <Page style={{padding:"50px", fontSize:14, display:'flex', flexDirection:'column', justifyContent:'space-between'}} size={'LETTER'}>
        <View style={{}}>
          <View fixed>
            <View style={{display:'flex', alignItems:'center', gap:5, marginBottom:20, fontSize:16}}>
              <Text>Dr.Manuel Mariño Solorzano</Text>
              <Text>Medico Cirujano</Text>
              <Text>Ced. Prof. 6524370</Text>
              <Text>Universidad del Norestse</Text>
            </View>
            <View style={{textAlign:"right"}}>
              <Text>{formatDateToFullDate(consulta?.fecha!)}</Text>
            </View>
            <View style={{display:"flex", flexDirection: "row", justifyContent:"space-between", marginTop:25, marginBottom:20}}>
              <Text>Paciente: {consulta?.expand.paciente.nombre} {consulta?.expand.paciente.apellidos}</Text>
              <Text>Edad: {consulta?.expand.paciente.edad} años</Text>
            </View>
            <View style={{display:'flex', gap:10, marginBottom:25, fontSize:14}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:12}}>
                <Text>Peso: {somatometria?.peso}kg</Text>
                <Text>Temp: {somatometria?.temperatura}°C</Text>
                <Text>FC: {somatometria?.fc}</Text>
                <Text>FR: {somatometria?.fr}</Text>
                <Text>IMC: {somatometria?.imc}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:12}}>
                <Text>Talla: {somatometria?.talla}</Text>
                <Text>SO2: {somatometria?.so2}%</Text>
                <Text>T/A: {somatometria?.ta}mmHg</Text>
              </View>
            </View>
            <View style={{marginBottom:50}}>
              <Text style={{textAlign:'right'}}>Dx. {consulta?.diagnostico}</Text>
            </View>
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
          <View fixed wrap={false} style={{marginTop:20}}>
            <View style={{textAlign:'right', marginBottom:12, fontSize:12}}>
              <Text>DR. MANUEL MARIÑO SOLORZANO</Text>
              <Text>MEDICO CIRUJANO</Text>
            </View>
            <View style={{fontSize:12, textAlign:'left'}}>
              <Text>Clinica de Especialidades Médicas.</Text>
              <Text>Gladiolas 318 Col. Las flores, Ciudad Madero.</Text>
              <Text>Urgencias: 833 145 5167.</Text>
              <Text>Contacto:drmmsolorzano@gmail.com.</Text>
              <Text>@doctorsolorzano.</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const Component = ({params}:pageProps) => {
  const router = useRouter();

  const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
  const [consulta, setConsulta] = useState<Consulta>();
  const [somat, setSomat] = useState<Somatometria>()
  const [client, setClient] = useState(false)

  async function load(){
    const tratData:any = await getTratamiento(params.id)
    const consData:any = await getSingleConsulta(params.id)
    const somatData:any = await getSomatometria(params.id)

    setTratamiento(tratData.items)
    setConsulta(consData)
    setSomat(somatData)

    console.log(tratData.items);
    console.log(consData)
    console.log(somatData)
    
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
                <DocumentComponent consulta={consulta as Consulta} tratamiento={tratamiento} 
                somatometria={somat as Somatometria}></DocumentComponent>
            </PDFViewer>
        </div>
      }
    </div>

  )
}

export default Component