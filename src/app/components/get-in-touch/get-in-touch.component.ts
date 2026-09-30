import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-get-in-touch',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.css'
})
export class GetInTouchComponent {
  submitted = false;
  error = false;

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
    } catch {
      this.error = true;
    }
  }
}
