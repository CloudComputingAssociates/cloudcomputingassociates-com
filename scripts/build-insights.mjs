// Build-time generator for the Insights section.
// Reads Markdown articles from src/content/insights/*.md, parses their front
// matter and body, and emits:
//   - src/app/content/insights.generated.ts  (typed article data + rendered HTML)
// Run automatically via the "prebuild" and "prestart" npm scripts.
// (sitemap.xml is generated from the full route list by scripts/postbuild.mjs.)

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'insights');
const OUT_TS = join(ROOT, 'src', 'app', 'content', 'insights.generated.ts');

function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, body: match[2] };
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text) {
  // Escape first, then apply inline markdown that uses characters we did not escape.
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => `<a href="${href}">${t}</a>`);
  return out;
}

// Minimal but serviceable Markdown -> HTML for article bodies.
function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let i = 0;
  let paragraph = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      flushParagraph();
      flushList();
      i++;
      continue;
    }

    // Fenced code block
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      flushParagraph();
      flushList();
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(\*\*\*|---|___)\s*$/.test(line)) {
      flushParagraph();
      flushList();
      html.push('<hr>');
      i++;
      continue;
    }

    // Unordered list
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) {
      flushParagraph();
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
        html.push('<ul>');
      }
      html.push(`<li>${inline(ul[1].trim())}</li>`);
      i++;
      continue;
    }

    // Ordered list
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ol) {
      flushParagraph();
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
        html.push('<ol>');
      }
      html.push(`<li>${inline(ol[1].trim())}</li>`);
      i++;
      continue;
    }

    paragraph.push(line.trim());
    i++;
  }

  flushParagraph();
  flushList();
  return html.join('\n');
}

function loadArticles() {
  if (!existsSync(CONTENT_DIR)) return [];
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const articles = files.map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    const slug = basename(file, '.md');
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      description: data.description || data.summary || '',
      author: data.author || 'Cloud Computing Associates',
      bodyHtml: renderMarkdown(body.trim())
    };
  });
  // Newest first by date, then slug.
  articles.sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));
  return articles;
}

function writeTs(articles) {
  const header =
    '// GENERATED FILE - do not edit by hand.\n' +
    '// Source: src/content/insights/*.md\n' +
    '// Regenerate with: node scripts/build-insights.mjs (runs automatically on build/start).\n\n';
  const iface =
    'export interface Insight {\n' +
    '  slug: string;\n' +
    '  title: string;\n' +
    '  date: string;\n' +
    '  summary: string;\n' +
    '  description: string;\n' +
    '  author: string;\n' +
    '  bodyHtml: string;\n' +
    '}\n\n';
  const body = 'export const INSIGHTS: Insight[] = ' + JSON.stringify(articles, null, 2) + ';\n';
  mkdirSync(dirname(OUT_TS), { recursive: true });
  writeFileSync(OUT_TS, header + iface + body, 'utf8');
}

const articles = loadArticles();
writeTs(articles);
console.log(`build-insights: generated ${articles.length} article(s).`);
