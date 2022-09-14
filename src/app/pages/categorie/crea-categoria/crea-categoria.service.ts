import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaCommand } from 'src/app/models/categoria/categoria-command';
import { CategoriaDTO } from 'src/app/models/categoria/categoria-DTO';

@Injectable({
  providedIn: 'root'
})
export class CreaCategoriaService {

  constructor(private http: HttpClient) { }

  creaCategoria(name: string, description: string) {

    const category = new CategoriaCommand;

    category.name = name;
    category.description = description;

    return this.http.post<CategoriaDTO>("http://localhost:8080/category/create", category);

  }
  
}

