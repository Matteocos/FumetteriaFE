export class FumettoCommand {

    name: string;
    description: string;
    type: string;
    idAuthor: number;
    nameCategory: string;
    photo: any;

}

export class FumettoDTO {

    list : List[];

}

export class List {

    id: string;
    name: string;
    surname: string;

}

export class UpdateFumettoCommand{

    id: string;
    name: string;
    description: string;
    type: string;
    idAuthor: number;
   nameCategory:string;
    photo: any;

}