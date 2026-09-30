import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import * as feather from 'feather-icons'

@Component({
  selector: 'app-navbar-full',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar-full.component.html',
  styleUrl: './navbar-full.component.css'
})
export class NavbarFullComponent {

  manu:string = '';
  subManu:string = '';
  current = ''
  toggleManu:boolean = false

    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        feather.replace()
      }
    }
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
      this.current = this.router.url;
      this.manu = this.current
      this.subManu = this.current
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    }

    openManu(item:string){
      this.subManu = item
    }

    toggleMenu(){
      this.toggleManu = !this.toggleManu
    }

    scroll:boolean = false

    @HostListener("window:scroll",['event'])


    onhandlerScroll(){
      if (window.scrollY > 0) {
        this.scroll = true
      }else{
        this.scroll = false
      }
    }

}
