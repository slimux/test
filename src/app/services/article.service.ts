import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { Article } from '../models/article.model';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';


const baseUrl = 'api/articles';  // URL to web api

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  get(id: any): Observable<Article> {
    return this.http.get<Article>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}