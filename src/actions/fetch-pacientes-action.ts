'use server'
import { getPacs } from "@/PocketBase/PocketBase"


export default async function fetchPacientes(page:number){
    'use server'
    const records = getPacs(page)
    return records
}