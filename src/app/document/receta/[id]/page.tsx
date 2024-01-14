'use client'

import { useEffect, useState } from 'react'
import { Document, Text, Page, View, Font, pdf, Image,Svg, Line, Circle } from '@react-pdf/renderer'
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

Font.register({
  family: 'Lato',
  fonts: [
    {
      src: '/Lato-Regular.ttf',
    },
    {
      src: '/Lato-Bold.ttf',
    },
  ],
});

const DocumentComponent = ({consulta, tratamiento, somatometria}: DefaultComponentProps) => {
  return(
    <Document style={{minHeight:'100vh'}} title={`Receta - ${consulta?.expand.paciente.nombre} ${consulta?.expand.paciente.apellidos} - ${consulta?.fecha.slice(0,10)}`}>
      <Page style={{padding:"50px", fontSize:14, display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'100vh', 
                    fontFamily:'Lato'}} size={'LETTER'}>
        <View style={{}}>
          <Image src={'/caduceo.png'} style={{width:75, position:'absolute'}}></Image>
          <View fixed>
            <View style={{display:'flex', alignItems:'center', gap:2, marginBottom:20, fontSize:16, fontWeight:"bold"}}>
              <Text>Dr. Manuel Mariño Solorzano</Text>
              <Text>Medico Cirujano</Text>
              <Text>Ced. Prof. 6524370</Text>
              <Text>Universidad del Norestse</Text>
            </View>
            <View style={{textAlign:"right", fontWeight:"bold"}}>
              <Text>{formatDateToFullDate(consulta?.fecha!)}</Text>
            </View>
            <Svg height="10" width="495"><Line x1="0" y1="10" x2="1200" y2="10" strokeWidth={2} stroke="rgb(150,150,150)" /></Svg>

            <View style={{display:"flex", flexDirection: "row", justifyContent:"space-between", marginTop:15, marginBottom:15}}>
              <Text><Text style={{fontWeight:'bold'}}>Paciente:</Text> {consulta?.expand.paciente.nombre} {consulta?.expand.paciente.apellidos}</Text>
              <Text><Text style={{fontWeight:'bold'}}>Edad:</Text> {consulta?.expand.paciente.edad} años</Text>
            </View>
            <View style={{display:'flex', gap:10, marginBottom:25, fontSize:14}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:12}}>
                <Text><Text style={{fontWeight:'bold'}}>Peso:</Text> {somatometria?.peso}kg</Text>
                <Text><Text style={{fontWeight:'bold'}}>Temp:</Text>  {somatometria?.temperatura}°C</Text>
                <Text><Text style={{fontWeight:'bold'}}>FC:</Text> {somatometria?.fc}</Text>
                <Text><Text style={{fontWeight:'bold'}}>FR:</Text> {somatometria?.fr}</Text>
                <Text><Text style={{fontWeight:'bold'}}>IMC:</Text> {somatometria?.imc}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:12}}>
                <Text><Text style={{fontWeight:'bold'}}>Talla:</Text> {somatometria?.talla}</Text>
                <Text><Text style={{fontWeight:'bold'}}>SO2:</Text> {somatometria?.so2}%</Text>
                <Text><Text style={{fontWeight:'bold'}}>TA:</Text> {somatometria?.ta}mmHg</Text>
              </View>
            </View>
            <View style={{marginBottom:15}}>
              <Text style={{textAlign:'right', fontWeight:"bold"}}>Dx. {consulta?.diagnostico}</Text>
            </View>
          </View>
          <Svg height="10" width="495"><Line x1="0" y1="0" x2="1200" y2="0" strokeWidth={2} stroke="rgb(150,150,150)" /></Svg>
          <View style={{textAlign:"left", marginTop:5}}>
            {tratamiento.map((item) => (
              <View key={item.id}>
                <View style={{display:'flex', flexDirection:'row', gap:5}}>
                  <Svg width={10} height={10} style={{marginTop:3}}>
                    <Circle cx="5" cy="5" r="3" fill={'black'} />
                  </Svg>
                  <Text style={{marginBottom:5, fontWeight:"bold", textDecoration:'underline'}}
                  >{item.expand.medicamento.nombre} {item.expand.medicamento.presentacion} {item.expand.medicamento.gramaje} mg</Text>
                </View>
                <Text style={{marginBottom:20}}>{item.indicaciones}</Text>
              </View>
            ))}
          </View>
          <View fixed wrap={false} style={{marginTop:20, bottom:0,
          left:0}}>
            <View style={{textAlign:'right', marginBottom:12, fontSize:12}}>
              <Text>DR. MANUEL MARIÑO SOLORZANO</Text>
              <Text>MEDICO CIRUJANO</Text>
            </View>
            <View style={{fontSize:12, textAlign:'left'}}>
              <Text style={{fontWeight:"bold"}}>Clinica de Especialidades Médicas.</Text>
              <Text>Gladiolas 318 Col. Las flores, Ciudad Madero.</Text>
              <Text>Urgencias: 833 145 5167.</Text>
              <Text>Contacto:drmmsolorzano@gmail.com.</Text>
              <Text style={{fontWeight:"bold", color:'#56b1db'}}>@doctorsolorzano.</Text>
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