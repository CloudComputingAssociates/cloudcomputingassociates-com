import { Component, OnInit } from '@angular/core';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { AboutComponent } from "../../components/about/about.component";
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { CommonModule } from '@angular/common';
import { GetInTouchTwoComponent } from "../../components/get-in-touch-two/get-in-touch-two.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';

@Component({
  selector: 'app-aboutus',
  imports: [
    CommonModule,
    NavbarFullComponent,
    AboutComponent,
    ServiceOneComponent,
    GetInTouchTwoComponent,
    FooterComponent
],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'About Us - Cloud Computing Associates',
      description: 'Founded in 2017, Cloud Computing Associates designs, builds and operates production AI systems on Google Cloud, working alongside your teams from strategy through deployment.',
      url: SITE_ORIGIN + '/aboutus'
    });
  }
}
