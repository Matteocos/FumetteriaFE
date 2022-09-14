import { Component, NgZone, OnInit } from '@angular/core';
import { CreaFumettoService } from './crea-fumetto.service';
import { FumettiDto } from 'src/app/models/DTO/fumetti-DTO';

@Component({
  selector: 'app-crea-fumetto',
  templateUrl: './crea-fumetto.page.html',
  styleUrls: ['./crea-fumetto.page.scss'],
})
export class CreaFumettoPage implements OnInit {

  name: string;
  description: string;
  type: string;
  authorID: number;
  categoryName: string;

  disabilita: boolean = false;

  tipo: string = "password";
  eye: string = "lock-open-sharp";

  eventoDiClick(): void{
    
    if (!this.disabilita) {
      
      this.creaFumetto();

    }
      
  }

  creaFumetto() {
    
    console.log("Entra");

    this.user.creaFumetto(this.name, this.description, this.type, this.authorID , this.categoryName).subscribe(resp => {

      const data: FumettiDto = resp;

      console.log(data);

      this.reset();

      alert("È stato aggiunto " + data.name + "!");
      
    }, error => {
      //grazie al nostro fratellino indiano
      alert("Si è verificato un errore nella creazione del fumetto.");
    })

  }

  reset() {
    
    this.name = "";
    this.description = "";
    this.type = "";
    this.authorID = null;
    this.categoryName = null;

  }

  constructor(private user: CreaFumettoService, private zone: NgZone) { }

  ngOnInit() {
  }

}