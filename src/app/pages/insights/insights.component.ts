import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarFullComponent } from '../../components/navbar/navbar-full/navbar-full.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { INSIGHTS, Insight } from '../../content/insights.generated';
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';

@Component({
  selector: 'app-insights',
  imports: [
    CommonModule,
    RouterLink,
    NavbarFullComponent,
    FooterComponent
  ],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent implements OnInit {
  insights: Insight[] = INSIGHTS;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Insights - Cloud Computing Associates',
      description: 'Articles and perspectives on AI, cloud and automation from Cloud Computing Associates.',
      url: SITE_ORIGIN + '/insights'
    });
  }
}
