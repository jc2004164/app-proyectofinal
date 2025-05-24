import { Categoria } from "./categoria";

export interface Proveedor {
  id?:number,
  nombre: string,
  nombre_empresa: string,
  email: string,
  telefono: string,
  direccion: string,
  categoria: number,
  tipo_empresa: string

}
