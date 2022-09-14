import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateUtenteCommand, IdCommand } from 'src/app/models/user/user-command';
import { UserDTO, UserListDTO } from 'src/app/models/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  httpHeader = new HttpHeaders().set('Content-type', 'application/json;charset-utf-8');
  options = { headers: this.httpHeader };

  constructor(private http: HttpClient) { }

  stampaUtenti() {

    return this.http.get<UserListDTO>("http://localhost:8080/user/list", {}); 

  }

  updateUtenti(id: string, name: string, surname: string, username: string, password: string) {
    
    const user = new UpdateUtenteCommand;

    user.id = id;
    user.name = name;
    user.surname = surname;
    user.username = username;
    user.password = password;

    return this.http.put<UserDTO>("http://localhost:8080/user/update/"+id, user);

  }

  eliminaUtenti(id: string) {

    return this.http.delete<any>("http://localhost:8080/user/delete/"+id, this.options);

  }

}
