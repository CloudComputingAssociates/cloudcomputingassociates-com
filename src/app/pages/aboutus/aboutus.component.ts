import { Component } from '@angular/core';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { AboutComponent } from "../../components/about/about.component";
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { CommonModule } from '@angular/common';
import { GetInTouchTwoComponent } from "../../components/get-in-touch-two/get-in-touch-two.component";
import { FooterComponent } from "../../components/footer/footer.component";

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
export class AboutusComponent {

}
