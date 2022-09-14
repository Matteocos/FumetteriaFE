import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateCategoriaCommand } from 'src/app/models/categoria/categoria-command';
import { CategoriaListDTO } from 'src/app/models/categoria/categoria-DTO';

@Injectable({
  providedIn: 'root'
})
export class ListaCategorieService {

  httpHeader = new HttpHeaders().set('Content-type', 'application/json;charset-utf-8');
  options = { headers: this.httpHeader };

  constructor(private http: HttpClient) { }

  stampaCategorie() {

    return this.http.get<CategoriaListDTO>("http://localhost:8080/category/list", {}); 

  }

  updateCategorie(id: number, name: string, description: string) {
    
    const user = new UpdateCategoriaCommand;

    user.id = id;
    user.name = name;
    user.description = description;

    return this.http.put<any>("http://2.44.173.210:7080/comic-be/api/category/update/", user);

  }

  eliminaCategorie(id: number) {

    return this.http.delete<any>("http://2.44.173.210:7080/comic-be/api/category/delete/"+id, this.options);

  }

}