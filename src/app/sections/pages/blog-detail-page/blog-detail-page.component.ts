import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog-service.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.css'
})
export class BlogDetailPageComponent implements OnInit {
 public articleId?: string;
  article: any;

  constructor(private route:ActivatedRoute,
              private blogService:BlogService,
  ) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios en el parámetro de la ruta
    this.route.paramMap.subscribe(
      (params) => {
        const id = params.get('id');    // Extraemos el parámetro 'id' desde la URL
        console.log(id);
        if (id) {
          this.articleId = id;  // Convertimos el 'id' a número (si es necesario)
          this.loadArticle(this.articleId);  // Cargamos el artículo usando el id
        }
      }
    );
  }


  shareOnTwitter():void {
    const text = encodeURIComponent(`Check out this article ${this.article.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  shareOnLinkedIn(): void {
    console.log(this.article.url);
    const urlPage = encodeURIComponent(window.location.href);
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlPage)}&title=${encodeURIComponent(this.article.title)}&summary=${encodeURIComponent(this.article.description)}`;
    window.open(url, '_blank');
  }

  copyLink(): void {
    const urlPage = encodeURIComponent(window.location.href);

    navigator.clipboard.writeText(urlPage).then(
      () => alert('Enlace copiado al portapapeles'),
      () => alert('Error al copiar el enlace')
    );
  }

  loadArticle(id: string): void {
    this.article = this.blogService.getArticlesById(id)
}

}
