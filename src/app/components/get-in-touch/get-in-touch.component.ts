import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getServicePage } from '../../data/services';

@Component({
  selector: 'app-get-in-touch',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.css'
})
export class GetInTouchComponent implements OnInit {
  submitted = false;
  error = false;
  serviceTitle: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
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
