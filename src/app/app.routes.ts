import { Routes } from '@angular/router';
import { IndexOneComponent } from './pages/index-one/index-one.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactusComponent } from './pages/contactus/contactus.component';

export const routes: Routes = [
    {path:'', component:IndexOneComponent},

    {path:'aboutus', component:AboutusComponent},
    {path:'services', component:ServicesComponent},
    {path:'contactus', component:ContactusComponent },
];
