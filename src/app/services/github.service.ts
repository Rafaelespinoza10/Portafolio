import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError, switchMap, timeout, retry } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private username = 'rafaelespinoza10';
  private readonly TIMEOUT_MS = 8000; // 8 segundos - más corto para evitar bloqueos

  constructor(private http: HttpClient) { }

  /**
   * Get user stats
   */
  getUserStats(username: string = this.username): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`).pipe(
      timeout(this.TIMEOUT_MS),
      retry(1), // Reintentar una vez si falla
      catchError(error => {
        console.error('Error fetching user stats:', error);
        return of(null);
      })
    );
  }

  /**
   * Get user repositories
   */
  getUserRepos(username: string = this.username, perPage: number = 100): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos?per_page=${perPage}&sort=updated`).pipe(
      timeout(this.TIMEOUT_MS),
      retry(1), // Reintentar una vez si falla
      catchError(error => {
        console.error('Error fetching repos:', error);
        return of([]);
      })
    );
  }

  /**
   * Get languages stats from all repositories (simplified - uses repo.language field)
   * This avoids making multiple API calls that can cause rate limiting
   */
  getLanguagesStats(username: string = this.username): Observable<any> {
    return this.getUserRepos(username).pipe(
      map((repos: any[]) => {
        const languages: any = {};
        // Count languages from repo.language field (available in repo list)
        repos.forEach((repo: any) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
        return languages;
      }),
      catchError(error => {
        console.error('Error fetching languages:', error);
        return of({});
      })
    );
  }

  /**
   * Get languages stats (simplified version)
   */
  getLanguagesStatsSimple(username: string = this.username): Observable<any> {
    return this.getUserRepos(username).pipe(
      map((repos: any[]) => {
        // For now, return empty object - we'll implement async version
        return {};
      })
    );
  }

  /**
   * Get total stars from all repositories
   */
  getTotalStars(username: string = this.username): Observable<number> {
    return this.getUserRepos(username).pipe(
      map((repos: any[]) => {
        return repos.reduce((total: number, repo: any) => total + (repo.stargazers_count || 0), 0);
      })
    );
  }

  /**
   * Get contributions graph URL (for iframe)
   */
  getContributionsGraphUrl(username: string = this.username): string {
    // Usar la página completa de contribuciones en un iframe
    return `https://github.com/users/${username}/contributions`;
  }

  /**
   * Get activity graph (línea azul de contribuciones del último mes)
   */
  getActivityGraphUrl(username: string = this.username): string {
    // Gráfico de actividad con tema personalizado para combinar con el proyecto
    return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&area=true&bg_color=0D1117&color=9333EA&line=EC4899&point=9333EA&title_color=EC4899`;
  }

  /**
   * Get contributions heatmap (calendario de contribuciones)
   */
  getContributionsHeatmapUrl(username: string = this.username): string {
    // Heatmap de contribuciones con fondo negro puro y colores personalizados
    // Usar servicio que permita más personalización de colores
    // bg_color=000000 (negro puro), los colores se cambiarán con CSS filters
    return `https://github-contributions-api.deno.dev/${username}.svg?theme=dark&bg_color=000000`;
  }
}
