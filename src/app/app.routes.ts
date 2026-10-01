import { Routes } from '@angular/router';
import { IndexOneComponent } from './pages/index-one/index-one.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { ArticleComponent } from './pages/insights/article/article.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { INSIGHTS } from './content/insights.generated';
import { servicePages } from './data/services';

export const routes: Routes = [
    {path:'', component:IndexOneComponent},

    {path:'aboutus', component:AboutusComponent},
    {path:'services', component:ServicesComponent},
    // Explicit per-slug routes so each detail page is prerendered, mirroring
    // the insights mechanism below.
    ...servicePages.map((p) => ({
        path: `services/${p.slug}`,
        component: ServiceDetailComponent,
        data: { slug: p.slug }
    })),
    // Any unrecognized service slug falls back to the services index.
    {path:'services/:slug', redirectTo:'services', pathMatch:'full' as const},
    {path:'contactus', component:ContactusComponent },

    {path:'insights', component:InsightsComponent},
    ...INSIGHTS.map((a) => ({
        path: `insights/${a.slug}`,
        component: ArticleComponent,
        data: { slug: a.slug }
    })),

    {path:'**', component:NotFoundComponent},
];
