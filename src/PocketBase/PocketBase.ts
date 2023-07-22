import pocketbaseEs from "pocketbase"

const pb = new pocketbaseEs("https://doc-note.pockethost.io")
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

export interface Record {
    collectionId: string;
    collectionName: string;
    created: string;
    gramaje: string;
    id: string;
    nombre: string;
    presentacion: string;
    updated: string;
    expand: {};
  }
  
export async function getMeds() {
    const records = await pb.collection('Medicamento').getFullList();

    return records;
}

