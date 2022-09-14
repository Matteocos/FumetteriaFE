import { Component, OnInit } from '@angular/core';
import { UpdateAutoreCommand } from 'src/app/models/autori/author-command';
import { List, AuthorListDTO, AuthorDTO } from 'src/app/models/autori/author-dto';
import { ListaAutoriService } from './lista-autori.service';

@Component({
  selector: 'app-lista-autori',
  templateUrl: './lista-autori.page.html',
  styleUrls: ['./lista-autori.page.scss'],
})
export class ListaAutoriPage implements OnInit {

  data: AuthorListDTO;

  id: number = null;
  nome: string = "";
  cognome: string = "";
  email: string = "";
  password: string = "";

  lastID: number = null;
  lastNome: string = "";
  lastCognome: string = "";

  cerca: boolean[] = [];

  pagina: boolean = true;

  disabilita: boolean = false;

  esiste: boolean[] = [];

  popup: boolean = false;
  popupElimina: boolean = false;

  attivo: boolean = false;

  constructor(private author : ListaAutoriService) { }

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
    
    this.author.stampaAutori().subscribe(res => {
        
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

  cambiaVisione(nome: string, cognome: string, id: number) {
    
    this.cambiaPagina();

    this.nome = nome;
    this.cognome = cognome;
    this.id = id;

  }

  cambiaPagina() {
    
    if(this.pagina == true)
      this.pagina = false;
    else {
      
      this.id= null;
      this.nome = "";
      this.cognome = "";
      this.email = "";
      this.password= "";

      this.pagina = true;

    }
      

  }

  updateAutore() {

    this.author.updateAutori(this.id, this.nome, this.cognome).subscribe(resp => {
        
      console.log("Entra");

      const data:  AuthorDTO= resp;

      console.log(data);

      alert("È stato fatto l'update di " + data.name + " " + data.surname + "!");
      this.cambiaPagina()
      this.reset()
    }, error => {
      this.password=""; //grazie al nostro fratellino indiano
      alert("Si è verificato un errore nell'update dell'autore");
    })

  }

  elimina() {
    
    this.author.eliminaAutori(this.lastID).subscribe(resp => {

      console.log(resp);

      const data: List = resp;

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

  mandaPopup(id: number, name: string, cognome: string) {
    
    if (!this.popup) {

      this.popup = true;
      this.lastID = id;
      this.lastNome = name;
      this.lastCognome = cognome;

    }
    else {
      
      this.popup = false;
      this.lastID = null;
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
