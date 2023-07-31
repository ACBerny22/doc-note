import pocketbaseEs from "pocketbase"
import { Paciente, Medicamento } from "@/Procedimientos/interfaces"
import toast, { Toaster } from 'react-hot-toast';

const pb = new pocketbaseEs(process.env.DB_URL)
export const isUserValid = pb.authStore.isValid
export const model = pb.authStore.model


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


export async function createPac(ss:any) {

    const data = {
        "curp": ss.curp,
        "nombre": ss.nombre,
        "apellidos": ss.apellidos,
        "edad": ss.edad,
        "fecha_nac": ss.fecha_nac + " 10:00:00.123Z",
        "estado_civil": ss.estado_civil,
        "sexo": ss.sexo
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

export async function searchConsulta(crup: string){

    const paciente = await getPacByCurp(crup)

    console.log(paciente.id);
    
    const record = await pb.collection('Consulta').getFirstListItem(`paciente="${paciente.id}"`, {
        sort: '-created',
        expand:'paciente'
    })
  
    return record;
}


export async function getConsultas() {
    const records = await pb.collection('Consulta').getFullList({
        sort: '-created',
        expand:'paciente'
    });

    return records;
}

export async function createConsulta(ss: any) {
    const data = {
        "fecha": ss.fecha + " 10:00:00.123Z",
        "paciente": ss.paciente,
        "enfermedades": ss.enfermedades,
        "motivo_consulta": ss.motivo_consulta,
        "exp_fisica": ss.exp_fisica,
        "isVerificada": false
    };
    
    const record = await pb.collection('Consulta').create(data);
}


export async function getTratamiento(consulta:string){
    const records = await pb.collection('Tratamiento').getList(1, 4, {
        sort: '-created',
        filter: `consulta="${consulta}"`,
        expand:'medicamento'
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


