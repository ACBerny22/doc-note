import React from "react";

//Paciente
export interface Paciente{
    curp:string
    nombre:string
    apellidos:string
    sexo:string
    fecha_nac:string
    edad:number
    estado_civil:string
    id:string
}

export interface ExpandPaciente {
    paciente:Paciente
}
  
//Medicamento
export interface Medicamento{
    id:string
    nombre:string
    gramaje:number
    presentacion:string
}

export interface ExpandMedicamento{
    medicamento:Medicamento
}


//Consulta
export interface  Consulta{
      id:string
      enfermedades:string
      fecha:string
      motivo_consulta:string
      exp_fisica:string
      paciente:string
      expand:ExpandPaciente
      isVerificada:boolean
}

//Tratamiento

export interface Tratamiento{
    id:string
    consulta:string
    medicamento:string
    expand:ExpandMedicamento
    indicaciones:string
}

export interface Cita{
    id:string
    expand:ExpandPaciente
    fecha:string
}