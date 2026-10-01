import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { servicePages, ServicePage, corePositioning } from '../../data/services';

@Component({
  selector: 'app-service-one',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './service-one.component.html',
  styleUrl: './service-one.component.css'
})
export class ServiceOneComponent {
  servicePages: ServicePage[] = servicePages
  subtitle = corePositioning.headline
  @Input() title:any
}
