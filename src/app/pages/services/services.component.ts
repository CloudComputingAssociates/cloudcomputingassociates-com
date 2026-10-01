import { Component, OnInit } from '@angular/core';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { CommonModule } from '@angular/common';
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { GetInTouchComponent } from "../../components/get-in-touch/get-in-touch.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';
import { corePositioning, deliveryFramework } from '../../data/services';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    NavbarFullComponent,
    ServiceOneComponent,
    GetInTouchComponent,
    FooterComponent
],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  corePositioning = corePositioning;
  deliveryFramework = deliveryFramework;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Services - Cloud Computing Associates',
      description: 'AI business process analysis, agentic automation, enterprise knowledge and retrieval, customer experience agents, AI optimization, and platform architecture on Google Cloud and Azure.',
      url: SITE_ORIGIN + '/services'
    });
  }
}
