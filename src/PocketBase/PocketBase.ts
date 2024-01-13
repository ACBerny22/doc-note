import PocketBase  from "pocketbase"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { calculateAge } from "@/Procedimientos/conversiones";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_URL)
export const isUserValid = pb.authStore.isValid
export const model = pb.authStore.model

export async function getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get('pb_auth');
    if (!cookie) {
        return false;
    }

    pb.authStore.loadFromCookie(cookie?.value || '');
    return pb.authStore.model;
}

export async function login(username: string, password: string){
    const authData = await pb.collection('users').authWithPassword(
        username,
        password,
    );

    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model?.id);


    window.location.reload()

}

export function logout(){
    pb.authStore.clear()
    
    window.location.reload()
}

export async function getUserImage(){
    const url = `https://doc-note.pockethost.io/api/files/users/t55vftwp3426d8o/aaron_K8EUGPIbvb.png`
    console.log(url);
    const res = await fetch(url);
    const imageBlob = await res.blob();
    const imageObjectUrl = URL.createObjectURL(imageBlob);

    return imageObjectUrl;
}

   
export async function getMeds(page: number) {
    const records = await pb.collection('Medicamento').getList(page, 6, {
        sort: '-created',
    });
    return records;
}

export async function addMeds(data:any) {
    const record = await pb.collection('Medicamento').create(data);
}

export async function getFilteredMeds(name: string) {
    const resultList = await pb.collection('Medicamento').getList(1, 10, {
        filter:`nombre~"${name}"`
    }).catch(() => console.log("jss"));

    return resultList;
}

export async function getPacs(page: number) {
    const records = await pb.collection('Paciente').getList(page, 6, {
        sort: '-created',
    });
    return records;
}

export async function searchPacs(name: string) {
    const records = await pb.collection('Paciente').getList( 1, 10, { filter: `nombre ~ "${name}"`})
    return records;
}

export async function getSinglePac(id:any) {
    const records = await pb.collection('Paciente').getFirstListItem(`id="${id}"`)
    return records;
}

export async function getPacByCurp(curp:string) {
    const records = await pb.collection('Paciente').getFirstListItem(`curp~"${curp}"`)
    return records;
}


export async function createPac(ss:any, user:any) {

    const data = {
        "curp": ss.curp,
        "nombre": ss.nombre,
        "apellidos": ss.apellidos,
        "edad": calculateAge(ss.fecha_nac),
        "fecha_nac": ss.fecha_nac + " 10:00:00.123Z",
        "estado_civil": ss.estado_civil,
        "sexo": ss.sexo,
        "user": [
            user
        ]
        
    };

    console.log(data);

    const record = await pb.collection('Paciente').create(data)
}


export async function getSingleConsulta(id: string){
    const record = await pb.collection('Consulta').getFirstListItem(`id="${id}"`, {
        sort: '-created',
        expand:'paciente'
    });
    return record;
}

export async function searchConsultaByDate(fecha: string){

    fecha = fecha + " 10:00:00"
    console.log(fecha)

    const records = await pb.collection('Consulta').getFullList({
        sort: '-created',
        filter: `fecha~"${fecha}"`,
        expand:'paciente'

    })

    return records;
}

export async function searchConsultaPerPaciente(id: string){

    const records = await pb.collection('Consulta').getList(1, 5, {
        sort: '-created',
        filter: `paciente="${id}"`,
    })

    return records;
}


export async function getConsultas(page:number, perPage:number) {
    const records = await pb.collection('Consulta').getList(page, perPage,{
        sort: '-created',
        expand:'paciente',
    });

    return records;
}

export async function createConsulta(ss: any, user:any) {
    const data = {
        "fecha": ss.fecha + " 10:00:00.123Z",
        "paciente": ss.paciente,
        "enfermedades": ss.enfermedades,
        "motivo_consulta": ss.motivo_consulta,
        "exp_fisica": ss.exp_fisica,
        "diagnostico":ss.diagnostico,
        "isVerificada": false,
        "usuario": user
    };
    
    const record = await pb.collection('Consulta').create(data);
}

export async function createSomat(ss:any, consultaID:any){
    // example create data
    const data = {
        "peso": ss.peso,
        "talla": ss.talla,
        "imc": ss.imc,
        "temperatura": ss.temperatura,
        "fc": ss.fc,
        "fr": ss.fr,
        "ta": ss.ta,
        "so2": ss.so2,
        "consulta": consultaID
    };

    const record = await pb.collection('somatometria').create(data);
}

export async function editSomat(ss:any, somatID:any){
    // example create data
    const data = {
        "peso": ss.peso,
        "talla": ss.talla,
        "imc": ss.imc,
        "temperatura": ss.temperatura,
        "fc": ss.fc,
        "fr": ss.fr,
        "ta": ss.ta,
        "so2": ss.so2,
        "consulta": ss.consulta
    };

    const record = await pb.collection('somatometria').update(somatID, data);
}

export async function verifyConsulta(id:string) {
    const data = {
        "isVerificada": true,
    };
    
    const record = await pb.collection('Consulta').update(id, data);
}


export async function getTratamiento(consulta:any){
    const records = await pb.collection('Tratamiento').getList(1, 4, {
        sort: '-created',
        filter: `consulta="${consulta}"`,
        expand:'medicamento'
    });

    return records;
}

export async function getSomatometria(consulta:any){
    const record = await pb.collection('somatometria').getFirstListItem(`consulta="${consulta}"`);

    return record;
}


export async function getTratamientoWithConsulta(consulta:any){
    const records = await pb.collection('Tratamiento').getList(1, 4, {
        sort: '-created',
        filter: `consulta="${consulta}"`,
        expand:'medicamento, consulta'
    });

    return records;
}

export async function createTratamiento(consulta:any, medicamento:string, indicaciones:string){
    const data = {
        "consulta": consulta,
        "medicamento": medicamento,
        "indicaciones": indicaciones
    };
    
    const record = await pb.collection('Tratamiento').create(data);
}

export async function deleteTratamiento(id:any) {
    const deleted =  await pb.collection('Tratamiento').delete(id);
}

export async function getCitas(page:number, perPage:number){
    const records = await pb.collection('Citas').getList(page, perPage,{
        sort: '-created',
        expand:'paciente',
    });

    return records;


}

