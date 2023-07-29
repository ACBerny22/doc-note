'use server'

import { getConsultas } from "@/PocketBase/PocketBase";

export async function loadConsultas(){
    const data:any = await getConsultas();
    return data;
  }