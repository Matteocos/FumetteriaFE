import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ListaService {

  constructor(private http:HttpClient) { }

  listaFumetti(){
    return this.http.get<any>("http://localhost:8080/product/list",{});
  }

}