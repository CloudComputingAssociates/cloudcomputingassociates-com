import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOneComponent } from "../../components/navbar/navbar-one/navbar-one.component";
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../../components/about/about.component";
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { GetInTouchComponent } from "../../components/get-in-touch/get-in-touch.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';
import { deliveryFramework } from '../../data/services';

@Component({
  selector: 'app-index-one',
  imports: [
    CommonModule,
    RouterLink,
    NavbarOneComponent,
    AboutComponent,
    ServiceOneComponent,
    GetInTouchComponent,
    FooterComponent
],
  templateUrl: './index-one.component.html',
  styleUrl: './index-one.component.css'
})
export class IndexOneComponent implements OnInit {
  currentSection: string | null = 'home';
  deliveryFramework = deliveryFramework;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Cloud Computing Associates - AI + Cloud = Automation',
      description: 'Cloud Computing Associates is a national AI consulting firm. We help leadership teams deploy AI agents, knowledge assistants and automation on Google Cloud.',
      url: SITE_ORIGIN + '/'
    });
    this.seo.setJsonLd('ld-professional-service', {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Cloud Computing Associates',
      description: 'National AI consulting firm helping leadership teams deploy AI agents, knowledge assistants and automation on Google Cloud.',
      url: SITE_ORIGIN + '/',
      areaServed: 'United States',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Portland',
        addressRegion: 'OR',
        addressCountry: 'US'
      },
      sameAs: ['https://www.linkedin.com/company/cloud-computing-associates'],
      foundingDate: '2017'
    });
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach((section) => {
      const sectionId = section.getAttribute('id');
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight) {
        this.currentSection = sectionId;
      }
    });
  }
}
