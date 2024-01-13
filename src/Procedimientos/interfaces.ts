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

export interface Somatometria{
    id:string
    peso: number,
    talla: string,
    imc: number,
    temperatura: number,
    fc: number,
    fr: number,
    ta: number,
    so2: number,
    consulta: string
}

export interface ExpandPaciente {
    paciente:Paciente
}
  
//Medicamento
export interface Medicamento{
    id:string
    nombre:string
    gramaje:string
    presentacion:string
}

//Para cuando se tiene que hacer expand a la consulta.
export interface ExpandMedicamento{
    medicamento:Medicamento
}

//Para cuando se tiene que hacer expand a la consulta.
export interface ExpandConsulta{
    consulta:Consulta
}


//Consulta
export interface  Consulta{
      id:string
      enfermedades:string
      fecha:string
      motivo_consulta:string
      exp_fisica:string
      diagnostico:string
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

export interface TratamientoDocument{
    id:string
    consulta:ExpandConsulta
    medicamento:string
    expand:ExpandMedicamento
    indicaciones:string
}

export interface Cita{
    id:string
    expand:ExpandPaciente
    fecha:string
}