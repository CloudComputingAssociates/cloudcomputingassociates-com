import { RenderMode, ServerRoute } from '@angular/ssr';
import { servicePages } from './data/services';

export const serverRoutes: ServerRoute[] = [
  // The six real service pages are prerendered to static HTML. Concrete paths
  // take precedence over the ':slug' pattern below.
  ...servicePages.map((p): ServerRoute => ({
    path: `services/${p.slug}`,
    renderMode: RenderMode.Prerender,
  })),
  // Unknown service slugs are client-rendered so the static build doesn't try
  // to prerender a parameterized route. The client router then redirects any
  // unmatched slug to /services (Netlify serves the SPA shell as a 200).
  { path: 'services/:slug', renderMode: RenderMode.Client },
  // Everything else prerenders, as before.
  { path: '**', renderMode: RenderMode.Prerender },
];
