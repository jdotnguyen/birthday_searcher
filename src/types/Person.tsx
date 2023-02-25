export interface Person {
  pages: Page[];
  text: string;
  year: number;
  favourite?: boolean;
}

interface Page {
  content_urls: PageTypes;
  description: string;
  description_source: string;
  dir: string;
  displaytitle: string;
  extract: string;
  extract_html: string;
  lang: string;
  namespace: Namespace;
  normalizedtitle: string;
  originalimage?: Image;
  pageid: number;
  revision: string;
  thumbnail?: Image;
  tid: string;
  timestamp: string;
  title: string;
  titles: TitleTypes;
  type: string;
  wikibase_item: string;
}

interface PageTypes {
  desktop: PageURLs;
  mobile: PageURLs;
}

interface PageURLs {
  edit: string;
  page: string;
  revisions: string;
  talk: string;
}

interface Namespace {
  id: number;
  text: string;
}

interface Image {
  height: number;
  source: string;
  width: number;
}

interface TitleTypes {
  canonical: string;
  display: string;
  normalized: string;
}