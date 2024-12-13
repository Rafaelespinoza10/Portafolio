import { Injectable } from '@angular/core';
import { articles } from '../../../data/articles';

@Injectable({providedIn: 'root'})
export class BlogService {

  getArticles(){
    return articles;
  }
  constructor() { }


  getArticlesById(id:string){
    return articles.find(article => article.id === id);
  }

}
