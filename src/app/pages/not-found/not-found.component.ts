import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarFullComponent } from '../../components/navbar/navbar-full/navbar-full.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink,
    NavbarFullComponent,
    FooterComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Page not found - Cloud Computing Associates',
      description: 'The page you are looking for does not exist or has moved.',
      url: SITE_ORIGIN + '/'
    });
  }
}
