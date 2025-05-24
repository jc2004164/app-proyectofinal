import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proveedor } from '../interfaces/proveedores/proveedor';
import { Observable } from 'rxjs';
import { API_CONSTANT } from '../constans/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  //uri='https://6824e1e60f0188d7e72b3c5b.mockapi.io/proveedores/Proveedores'

  uri= `${API_CONSTANT.apiBase}/Proveedores`
  http=inject(HttpClient)


  constructor() { }



  getAll():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.uri);
  }
  findByNombre_empresa(nombre_empresa:string):Observable<Proveedor[]>{
    const uri_local=`${this.uri}/?nombre_empresa=${nombre_empresa}`;
    return this.http.get<Proveedor[]>(uri_local);
  }

  existsByNombre(nombre_empresa: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.uri}/?nombre_empresa=${nombre_empresa}`);
  }
  findById(id?:number):Observable<Proveedor>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local)
    return this.http.get<Proveedor>(uri_local);
  }

  add(proveedor:Proveedor):Observable<Proveedor>{
    //return this.http.post<Product>(this.uri+'x',product);
    return this.http.post<Proveedor>(this.uri,proveedor);
  }

  update(id:number,proveedor:Proveedor):Observable<Proveedor>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local)
    return this.http.put<Proveedor>(uri_local,proveedor);
  }


  delete(id?:number):Observable<boolean>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local)
    return this.http.delete<boolean>(uri_local);

  }

}
