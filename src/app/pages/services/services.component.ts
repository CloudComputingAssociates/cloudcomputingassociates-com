import { Component, OnInit } from '@angular/core';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { CommonModule } from '@angular/common';
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    NavbarFullComponent,
    ServiceOneComponent,
    FooterComponent
],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Services - Cloud Computing Associates',
      description: 'AI and cloud services: analysis, consulting, architecture and design, development, testing and compliance, delivered on Google Cloud.',
      url: SITE_ORIGIN + '/services'
    });
  }
}
