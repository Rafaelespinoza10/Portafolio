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
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutos en milisegundos
  private readonly CACHE_PREFIX = 'github_stats_';

  constructor(private http: HttpClient) { }

  /**
   * Guardar datos en localStorage con timestamp
   */
  private setCache(key: string, data: any): void {
    try {
      const cacheData = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_PREFIX + key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Error saving to cache:', error);
    }
  }

  /**
   * Obtener datos del cache si no han expirado
   */
  private getCache(key: string): any | null {
    try {
      const cached = localStorage.getItem(this.CACHE_PREFIX + key);
      if (!cached) {
        return null;
      }

      const cacheData = JSON.parse(cached);
      const now = Date.now();
      const age = now - cacheData.timestamp;

      // Si el cache expiró, eliminarlo y retornar null
      if (age > this.CACHE_TTL) {
        localStorage.removeItem(this.CACHE_PREFIX + key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Error reading from cache:', error);
      return null;
    }
  }

  /**
   * Limpiar cache
   */
  clearCache(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Error clearing cache:', error);
    }
  }

  /**
   * Get user stats
   */
  getUserStats(username: string = this.username, useCache: boolean = true): Observable<any> {
    const cacheKey = `user_${username}`;
    
    // Intentar obtener del cache primero
    if (useCache) {
      const cached = this.getCache(cacheKey);
      if (cached !== null) {
        return of(cached);
      }
    }

    // Si no hay cache, hacer petición
    return this.http.get(`${this.apiUrl}/users/${username}`).pipe(
      timeout(this.TIMEOUT_MS),
      retry(1), // Reintentar una vez si falla
      map((data: any) => {
        // Guardar en cache si la petición fue exitosa
        if (data) {
          this.setCache(cacheKey, data);
        }
        return data;
      }),
      catchError(error => {
        console.error('Error fetching user stats:', error);
        // Intentar devolver cache aunque esté expirado como fallback
        const expiredCache = this.getCache(cacheKey);
        return of(expiredCache || null);
      })
    );
  }

  /**
   * Get user repositories
   */
  getUserRepos(username: string = this.username, perPage: number = 100, useCache: boolean = true): Observable<any[]> {
    const cacheKey = `repos_${username}_${perPage}`;
    
    // Intentar obtener del cache primero
    if (useCache) {
      const cached = this.getCache(cacheKey);
      if (cached !== null) {
        return of(cached);
      }
    }

    // Si no hay cache, hacer petición
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos?per_page=${perPage}&sort=updated`).pipe(
      timeout(this.TIMEOUT_MS),
      retry(1), // Reintentar una vez si falla
      map((data: any[]) => {
        // Guardar en cache si la petición fue exitosa
        if (data && data.length > 0) {
          this.setCache(cacheKey, data);
        }
        return data || [];
      }),
      catchError(error => {
        console.error('Error fetching repos:', error);
        // Intentar devolver cache aunque esté expirado como fallback
        const expiredCache = this.getCache(cacheKey);
        return of(expiredCache || []);
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
