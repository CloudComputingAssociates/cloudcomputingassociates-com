import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { servicePages } from '../../data/services';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year:any
  servicePages = servicePages
  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
}
