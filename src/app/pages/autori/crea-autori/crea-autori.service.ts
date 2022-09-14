import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorCommand } from 'src/app/models/autori/author-command';

@Injectable({
  providedIn: 'root'
})
export class CreaAutoriService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  creaAutore(name: string, surname: string) {
    
    

    const autor = new AuthorCommand;

    autor.name = name;
    autor.surname = surname;

    alert("aggiunto autore : "+autor.name+" "+autor.surname);

    return this.http.post<any>("http://localhost:8080/autor/create",autor );

  }
  
}
