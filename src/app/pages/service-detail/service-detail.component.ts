import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarFullComponent } from '../../components/navbar/navbar-full/navbar-full.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService, SITE_ORIGIN } from '../../services/seo.service';
import {
  ContentBlock,
  getServicePage,
  servicePages,
  ServicePage,
} from '../../data/services';

/** A run of consecutive blocks that share the same `technical` flag. */
interface Segment {
  technical: boolean;
  blocks: ContentBlock[];
}

@Component({
  selector: 'app-service-detail',
  imports: [
    CommonModule,
    RouterLink,
    NavbarFullComponent,
    FooterComponent,
  ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit {
  page?: ServicePage;
  others: ServicePage[] = [];
  segments: Segment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.data['slug'] as string;
    this.page = getServicePage(slug);

    // Safety net — explicit routes always resolve, but an unknown slug
    // (reached via the services/:slug fallback) returns to the index.
    if (!this.page) {
      this.router.navigateByUrl('/services');
      return;
    }

    this.others = servicePages.filter((p) => p.slug !== this.page!.slug);
    this.segments = this.groupByTechnical(this.page.blocks);

    const url = `${SITE_ORIGIN}/services/${this.page.slug}`;
    this.seo.update({
      title: `${this.page.title} | Cloud Computing Associates`,
      description: this.page.metaDescription,
      url,
    });

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  /** Collapse consecutive technical blocks into one segment so they share a panel. */
  private groupByTechnical(blocks: ContentBlock[]): Segment[] {
    const segments: Segment[] = [];
    for (const block of blocks) {
      const technical = block.technical === true;
      const last = segments[segments.length - 1];
      if (last && last.technical === technical) {
        last.blocks.push(block);
      } else {
        segments.push({ technical, blocks: [block] });
      }
    }
    return segments;
  }
}
