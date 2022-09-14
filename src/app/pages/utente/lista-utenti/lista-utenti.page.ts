import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDTO, UserListDTO } from 'src/app/models/user/user-dto';
import { UtentiService } from './lista-utenti.service';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.page.html',
  styleUrls: ['./lista-utenti.page.scss'],
})
export class ListaUtentiPage implements OnInit {

  data: UserListDTO;

  id: string = "";
  nome: string = "";
  cognome: string = "";
  email: string = "";
  password: string = "";

  lastID: string = "";
  lastNome: string = "";
  lastCognome: string = "";

  cerca: boolean[] = [];

  pagina: boolean = true;

  tipo: string = "password";
  eye: string = "lock-open-sharp";
  disabilita: boolean = true;

  esiste: boolean[] = [];

  popup: boolean = false;
  popupElimina: boolean = false;

  attivo: boolean = false;

  constructor(private userService : UtentiService) { }

  reset() {

    this.nome = "";
    this.cognome = "";

    this.stampa();
    this.search();

  }

  ngOnInit() {

    this.stampa();

  }

  stampa() {
    
    this.userService.stampaUtenti().subscribe(res => {
        
      this.data = res;
      
      this.search();
      this.esistono();
      
      this.attivo = true;
        
      })

  }

  search() {

    for (let i = 0; i < this.data.list.length; i++){

      if ((this.data.list[i].name.toUpperCase().includes(this.nome.toUpperCase()) && this.data.list[i].surname.toUpperCase().includes(this.cognome.toUpperCase())) || (this.nome == "" && this.cognome == ""))
        this.cerca[i] = true;
      else
        this.cerca[i] = false;

    }

  }
  
  esistono() {

    for (let i = 0; i < this.data.list.length; i++){

      this.esiste[i] = true;

    }

  }

  cambiaVisione(nome: string, cognome: string, email: string, id: string) {
    
    this.cambiaPagina();

    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.id = id;

  }

  cambiaPagina() {
    
    if(this.pagina == true)
      this.pagina = false;
    else {
      
      this.id= "";
      this.nome = "";
      this.cognome = "";
      this.email = "";
      this.password= "";

      this.pagina = true;

    }
      

  }

  eventoBottone(): void{
    
    if (this.password) {
      
      this.tipo = "password";
      this.eye = "eye-off-outline";

    }
      
    if (this.nome && this.cognome && this.email && this.password)
      this.disabilita = false;
    else
      this.disabilita = true;

  }

  eventoDiClick(): void{
    
    if (!this.disabilita) {
      
      this.updateUtente();

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

  updateUtente() {

    this.userService.updateUtenti(this.id, this.nome, this.cognome, this.email, this.password).subscribe(resp => {
        
      console.log("Entra");

      const data: UserDTO = resp;

      console.log(data);

      alert("È stato fatto l'update di " + data.name + " " + data.surname + " "  + data.username + "!");
      this.cambiaPagina()
      this.reset()
    }, error => {
      this.password=""; //grazie al nostro fratellino indiano
      alert("Si è verificato un errore");
    })

  }

  elimina() {
    
    this.userService.eliminaUtenti(this.lastID).subscribe(resp => {

      console.log(resp);

      const data: UserDTO = resp;

      this.mandaPopupElimina(false);

      this.reset();

      //alert("È stato eliminato l'utente " + data.name + " " + data.surname + ", " + data.email + "!");
      
    }, error => {
      this.password = ""; //grazie al nostro fratellino indiano
      this.mandaPopup(this.lastID, this.nome, this.cognome);
      alert("Si è verificato un errore durante l'eliminazione dell'utente");
    })

    //this.esiste[i] = false;

  }

  mandaPopup(id: string, name: string, cognome: string) {
    
    if (!this.popup) {

      this.popup = true;
      this.lastID = id;
      this.lastNome = name;
      this.lastCognome = cognome;

    }
    else {
      
      this.popup = false;
      this.lastID = "";
      this.lastNome = "";
      this.lastCognome = "";

    }
      

  }

  mandaPopupElimina(opt: boolean) {

    if (opt) {
     
      this.mandaPopup(this.id, this.nome, this.cognome);
      this.popupElimina = false;

    }
    else {
      
      this.popupElimina = true;

    }
      

  }

  annulla() {
    
    this.mandaPopup(this.id, this.nome, this.cognome);
    this.reset();

  }

}
