import { inject, Injectable } from '@angular/core';
import { API_CONSTANT } from '../constans/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/proveedores/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  uri= `${API_CONSTANT.apiBase}/Categoria`
  //uri='https://6824e1e60f0188d7e72b3c5b.mockapi.io/proveedores/Categoria'
  http=inject(HttpClient)


  constructor() { }

  getAll():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.uri);
  }

}
