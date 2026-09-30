import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarFullComponent } from '../../../components/navbar/navbar-full/navbar-full.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { INSIGHTS, Insight } from '../../../content/insights.generated';
import { SeoService, SITE_ORIGIN } from '../../../services/seo.service';

@Component({
  selector: 'app-article',
  imports: [
    CommonModule,
    RouterLink,
    NavbarFullComponent,
    FooterComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  article?: Insight;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.data['slug'] as string;
    this.article = INSIGHTS.find((a) => a.slug === slug);
    if (!this.article) {
      return;
    }

    const url = `${SITE_ORIGIN}/insights/${this.article.slug}`;
    this.seo.update({
      title: `${this.article.title} - Cloud Computing Associates`,
      description: this.article.description,
      url,
      type: 'article'
    });
    this.seo.setJsonLd('ld-article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: this.article.title,
      description: this.article.description,
      datePublished: this.article.date,
      author: {
        '@type': 'Organization',
        name: this.article.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Cloud Computing Associates'
      },
      mainEntityOfPage: url
    });
  }
}
