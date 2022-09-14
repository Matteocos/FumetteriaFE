import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  UpdateAutoreCommand } from 'src/app/models/autori/author-command';
import { AuthorDTO, AuthorListDTO } from 'src/app/models/autori/author-dto';

@Injectable({
  providedIn: 'root'
})
export class ListaAutoriService {

  httpHeader = new HttpHeaders().set('Content-type', 'application/json;charset-utf-8');
  options = { headers: this.httpHeader };

  constructor(private http: HttpClient) { }

  stampaAutori() {

    return this.http.get<AuthorListDTO>("http://localhost:8080/author/list", {}); 

  }

  updateAutori(id: number, name: string, surname: string) {
    
    const user = new UpdateAutoreCommand;

    user.id = id;
    user.name = name;
    user.surname = surname;

    return this.http.put<AuthorDTO>("http://localhost:8080/author/update/"+id, user);

  }

  eliminaAutori(id: number) {

    return this.http.delete<any>("http://localhost:8080/author/delete/"+id, this.options);

  }

}
