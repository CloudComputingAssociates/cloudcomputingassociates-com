import { Routes } from '@angular/router';
import { IndexOneComponent } from './pages/index-one/index-one.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { ArticleComponent } from './pages/insights/article/article.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { INSIGHTS } from './content/insights.generated';

export const routes: Routes = [
    {path:'', component:IndexOneComponent},

    {path:'aboutus', component:AboutusComponent},
    {path:'services', component:ServicesComponent},
    {path:'contactus', component:ContactusComponent },

    {path:'insights', component:InsightsComponent},
    ...INSIGHTS.map((a) => ({
        path: `insights/${a.slug}`,
        component: ArticleComponent,
        data: { slug: a.slug }
    })),

    {path:'**', component:NotFoundComponent},
];
