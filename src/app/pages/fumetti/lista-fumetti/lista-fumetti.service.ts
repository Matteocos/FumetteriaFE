import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateFumettoCommand } from 'src/app/models/DTO/fumetti-command';

@Injectable({
  providedIn: 'root'
})
export class ListaFumettiService {

  httpHeader = new HttpHeaders().set('Content-type', 'application/json;charset-utf-8');
  options = { headers: this.httpHeader };

  constructor(private http: HttpClient) { }

  stampaFumetti() {

    return this.http.get<any>("http://localhost:8080/product/list", {}); 

  }

  updateFumetti(id: string, nome: string, description: string, type: string, authorID: number, categoryName: string ) {
    
    const user = new UpdateFumettoCommand;

    user.id = id;
    user.name = nome;
    user.description = description;
    user.type = type;
    user.idAuthor = authorID;
    user.nameCategory = categoryName;
    user.photo = null;

    return this.http.put<any>("http://2.44.173.210:7080/comic-be/api/comic/update/", user);

  }

  eliminaFumetti(id: string) {

    return this.http.delete<any>("http://2.44.173.210:7080/comic-be/api/comic/delete/"+id, this.options);

  }

  stampaAutori() {

    return this.http.post<any>("http://2.44.173.210:7080/comic-be/api/author/search/", {}); 

  }

  stampaCategorie() {

    return this.http.post<any>("http://2.44.173.210:7080/comic-be/api/category/search/", {}); 

  }

}