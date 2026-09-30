import { Component, HostListener } from '@angular/core';
import { NavbarOneComponent } from "../../components/navbar/navbar-one/navbar-one.component";
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../../components/about/about.component";
import { ServiceOneComponent } from "../../components/service-one/service-one.component";
import { GetInTouchComponent } from "../../components/get-in-touch/get-in-touch.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-index-one',
  imports: [
    CommonModule,
    NavbarOneComponent,
    AboutComponent,
    ServiceOneComponent,
    GetInTouchComponent,
    FooterComponent
],
  templateUrl: './index-one.component.html',
  styleUrl: './index-one.component.css'
})
export class IndexOneComponent {
  currentSection: string | null = 'home';

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
