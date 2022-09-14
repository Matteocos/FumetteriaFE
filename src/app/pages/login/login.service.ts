import { Injectable } from '@angular/core';
import { UserCommand } from 'src/app/models/user/user-command';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  login( username: string, password: string) {
    
    const user = new UserCommand;
    user.username = username;
    user.password = password;

    return this.http.post<any>("http://localhost:8080/login", user);

  }

}

