import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteCommand } from 'src/app/models/user/user-command';
import { UserDTO } from 'src/app/models/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class CreaUtenteService {

  constructor(private http: HttpClient) { }

  creaUtente(name: string, surname: string, username: string, password: string) {
    
    const user = new UtenteCommand;

    user.name = name;
    user.surname = surname;
    user.username = username;
    user.password = password;

    return this.http.post<any>("http://localhost:8080/user/create",user);

  }
  
}
