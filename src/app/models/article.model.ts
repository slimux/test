import {Caracteristiques} from "./caracteristiques.model";
import {Chipsetgraphique} from "./chipsetgraphique.model";
import {Caracteristiques1} from "./caracteristiques1.model";



export class Article {
    id?: any;
    category?: string;
    desingnation?: string;
    marque?: string;
    modele?: string;
    caracteristiques?: Caracteristiques;
    chipsetgraphique?: Chipsetgraphique;
    caracteristiques1?: Caracteristiques1;
  }

