import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/models/user/user-dto';
import { CreaUtenteService } from './crea-utente.service';

@Component({
  selector: 'app-crea-utente',
  templateUrl: './crea-utente.page.html',
  styleUrls: ['./crea-utente.page.scss'],
})
export class CreaUtentePage implements OnInit {

  name: string;
  surname: string;
  username: string;
  password: string;

  disabilita: boolean = true;

  formLogin;

  tipo: string = "password";
  eye: string = "lock-open-sharp";
  pagina: boolean = true;


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
      
      this.creaUtente();

    }
      
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
  cambiaPagina(){
    if(this.pagina == true)
    this.pagina = false;

  }

  creaUtente() {
    
    this.user.creaUtente(this.name, this.surname, this.username, this.password).subscribe(resp => {
        
      console.log("Entra");

      const data: UserDTO = resp;

      console.log(data);

      this.reset();

      alert("È stato aggiunto " + data.name + " " + data.surname + "!");
      location.href = '/lista-utenti'
      this.reset()
      
    }, error => {
      this.password=""; //grazie al nostro fratellino indiano
      alert("Si è verificato un errore");
    })

  }

  reset() {
    
    this.name = "";
    this.surname = "";
    this.username = "";
    this.password = "";

  }

  constructor(private fb:FormBuilder, private user: CreaUtenteService, private zone: NgZone) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      name: ['',[Validators.required]],
      surname:['',[Validators.required]],
      username: ['',[Validators.required, Validators.email]],
      password:['',[Validators.pattern,Validators.required, Validators.minLength(4)]],
  })
  }

}
