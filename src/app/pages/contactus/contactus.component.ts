import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';
import { getServicePage } from '../../data/services';

@Component({
  selector: 'app-contactus',
  imports: [
    CommonModule,
    FormsModule,
    NavbarFullComponent,
    FooterComponent
],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit {
  submitted = false;
  error = false;
  serviceTitle: string | null = null;

  constructor(private seo: SeoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact - Cloud Computing Associates',
      description: 'Contact Cloud Computing Associates. Portland, Oregon, serving clients nationwide. Use the contact form to get in touch.',
      url: SITE_ORIGIN + '/contactus'
    });

    const slug = this.route.snapshot.queryParamMap.get('service');
    this.serviceTitle = slug ? getServicePage(slug)?.title ?? null : null;
  }

  async onSubmit(form: NgForm) {
    const body = new URLSearchParams();
    body.set('form-name', 'contact');
    Object.entries(form.value).forEach(([key, value]) => {
      body.set(key, value == null ? '' : String(value));
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      this.submitted = true;
      this.error = false;
      form.resetForm();
    } catch (err) {
      console.error('Contact form submission failed', err);
      this.error = true;
    }
  }
}
