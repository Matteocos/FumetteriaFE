import { Component, NgZone, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';


import { UserDTO } from 'src/app/models/user/user-dto';
import { LoginService } from './login.service';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string;
  password:string;

  formLogin;
  disabilita: boolean = true;
  
  tipo: string = "password";
  eye: string = "lock-open-sharp";

  eventoBottone(): void{
    
    if (this.formLogin.get("password").valid) {
      
      this.tipo = "password";
      this.eye = "eye-off-outline";

    }
      

    if (this.formLogin.get("username").valid && this.formLogin.get("password").valid)
      this.disabilita = false;
    else
      this.disabilita = true;

  }

  eventoDiClick(): void{
    
    if (!this.disabilita) {
      
      this.loginServer();

    }
      
  }

  loginServer(){

      this.user.login(this.username, this.password).subscribe(resp => {
        
        console.log("Entra");

        const data: UserDTO = resp;

        console.log(data);

        this.zone.runOutsideAngular(() => {

          window.location.href = '/home';

        })
        
      }, error => {
        this.password=""; //grazie al nostro fratellino indiano
        alert("Email o Password errata");
      })

  }

  cambioTipo(): void{
    
    if (this.tipo == "password") {
      
      this.tipo = "";
      this.eye = "eye-outline";

    }
    else {
      
      this.tipo = "password";
      this.eye = "eye-off-outline";

    }
      

  } 

  constructor(private fb:FormBuilder, private user: LoginService, private zone: NgZone) {
   
  }


  ngOnInit() {

      this.formLogin = this.fb.group({
        username: ['',[Validators.required, Validators.email]],
        password:['',[Validators.pattern,Validators.required,Validators.minLength(4)]],
    })

  }

}
