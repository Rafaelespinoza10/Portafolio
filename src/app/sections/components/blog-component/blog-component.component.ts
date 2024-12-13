import { BlogService } from './../../services/blog-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog-component.component.html',
  styleUrl: './blog-component.component.css'
})
export class BlogComponentComponent implements OnInit{
  public articles: any;
  constructor(private blogService : BlogService){}


  ngOnInit(): void {
      this.obtainArticle();
  }

  obtainArticle(){
    this.articles = this.blogService.getArticles();

  }



}
