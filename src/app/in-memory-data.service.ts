import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Article } from './models/article.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 12, category: 'Processeur',desingnation: 'test',marque: 'Intel', modele: 'Hp', caracteristiques: {fcpu: '11',core: '22', threads: '33'} },
      { id: 13, category: 'Carte graphique',desingnation: 'test',marque: 'Intel', modele: 'Hp' },
      { id: 14, category: 'Carte mère',desingnation: 'test',marque: 'Intel', modele: 'Hp' },

    ];
    return {articles};
  }


  genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 11;
  }
}