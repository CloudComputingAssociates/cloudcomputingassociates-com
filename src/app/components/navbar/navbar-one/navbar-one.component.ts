import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as feather from 'feather-icons';



@Component({
  selector: 'app-navbar-one',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar-one.component.html',
  styleUrl: './navbar-one.component.css'
})
export class NavbarOneComponent {
  current = ''
  toggleManu:boolean = true

  toggleMenu(){
    this.toggleManu = !this.toggleManu
  }

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.current = this.router.url;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  @Input() currentSection:any

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      feather.replace()
    }
  }

  toggle:boolean = false

  scroll:boolean = false

  @HostListener("window:scroll",['event'])


  onhandlerScroll(){
    if (window.scrollY > 0) {
      this.scroll = true
    }else{
      this.scroll = false
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
