import { Inject, Injectable } from "@angular/core";
import { SEOData } from "../interfaces/seo.interface";
import { Title, Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";


@Injectable({
    providedIn: 'root'
})
export class SEOService {
    private readonly baseUrl = 'https://rafaelespinozadev.com/'
    private readonly defaultImage = `${this.baseUrl}images/profile_raf2.png`;
    private readonly defaultDescription = 'Full Stack Developer | Machine Learning Learner | Engineer Mechatronics | Web Developer | Mobile Developer';
    private readonly defaultKeywords = 'Full Stack Developer, Machine Learning, Angular, React, Node.js, Python, Rafael Moreno, WebSite, Web Developer, Mobile Developer, Flutter, Dart';

    constructor(
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private document: Document
    ){}

    public getDefaultImage(): string {
        return this.defaultImage;
    }

    updateSEO(data: SEOData): void {
        const {
            title,
            description = this.defaultDescription,
            keywords = this.defaultKeywords,
            image = this.defaultImage,
            url = this.baseUrl,
            type = 'website',
        } = data;

        this.title.setTitle(title);

        // meta tags basics
           // Meta tags básicos
           this.updateOrCreateTag('name', 'description', description);
           this.updateOrCreateTag('name', 'keywords', keywords);
           this.updateOrCreateTag('name', 'author', 'Rafael Moreno');
   
           // Open Graph (Facebook, LinkedIn)
           this.updateOrCreateTag('property', 'og:title', title);
           this.updateOrCreateTag('property', 'og:description', description);
           this.updateOrCreateTag('property', 'og:image', image);
           this.updateOrCreateTag('property', 'og:image:url', image);
           this.updateOrCreateTag('property', 'og:image:secure_url', image);
           this.updateOrCreateTag('property', 'og:image:type', 'image/png');
           this.updateOrCreateTag('property', 'og:url', url);
           this.updateOrCreateTag('property', 'og:type', type);
           this.updateOrCreateTag('property', 'og:site_name', 'Rafael Moreno - Portafolio');
           this.updateOrCreateTag('property', 'og:locale', 'es_ES');
   
           // Twitter Cards
           this.updateOrCreateTag('name', 'twitter:card', 'summary_large_image');
           this.updateOrCreateTag('name', 'twitter:title', title);
           this.updateOrCreateTag('name', 'twitter:description', description);
           this.updateOrCreateTag('name', 'twitter:image', image);
   
           // Canonical URL
           this.updateCanonicalUrl(url);
    }
    
    private updateOrCreateTag(attr: string, selector: string, content: string): void {
        const existingTag = this.meta.getTag(`${attr}="${selector}"`);
        if (existingTag) {
            this.meta.updateTag({ [attr]: selector, content });
        } else {
            this.meta.addTag({ [attr]: selector, content });
        }
    }

    private updateCanonicalUrl(url: string): void {
        let link: HTMLLinkElement | null = this.document.querySelector(`link[rel="canonical"]`);
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
   
    public addSchemaMarkup(schema: object): void {
        const existingScript = this.document.querySelector(`script[type="application/ld+json"]`);
        if (existingScript) {
            existingScript.remove();
        }

        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        this.document.head.appendChild(script);
    }

    public addPersonSchema(): void {
        const schema:any  = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Rafael Moreno",
            "alternateName": "Alejandro Rafael Moreno Espinoza",
            "jobTitle": "Full Stack Developer",
            "url": this.baseUrl,
            "sameAs": [
                "https://www.linkedin.com/in/rafael-moreno-espinoza10",
                "https://github.com/Rafaelespinoza10",
            ],
            "email": "rafael.moreno.espinoza10@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Luis Potosi",
                "addressCountry": "MX"
            }
        };
        this.addSchemaMarkup(schema);
    }

    public addWebSiteSchema(): void {
        const schema:any = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rafael Moreno | WebSite",
            "url": this.baseUrl,
            "author": {
                "@type": "Person",
                "name": "Rafael Moreno",
            }
        };
        this.addSchemaMarkup(schema);
    }
}