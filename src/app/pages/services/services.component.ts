import { Component } from '@angular/core';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { CommonModule } from '@angular/common';
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { FooterComponent } from "../../components/footer/footer.component";

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
export class ServicesComponent {

}
