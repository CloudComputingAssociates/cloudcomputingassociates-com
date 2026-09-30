import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarFullComponent } from "../../components/navbar/navbar-full/navbar-full.component";
import { FooterComponent } from "../../components/footer/footer.component";

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
export class ContactusComponent {
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
    } catch (err) {
      console.error('Contact form submission failed', err);
      this.error = true;
    }
  }
}
