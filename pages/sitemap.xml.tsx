const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(authors: any, books: any, genres: any, tags: any) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      
      <!-- Manually generate page-->
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${BASE_URL}/books</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/authors</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/genres</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/tags</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>

  ${books
    .map((book: any) => {
      return `
      <url>
        <loc>${`${BASE_URL}/books/${book.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
    ${authors
      .map((author: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/authors/${author.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}
    
    ${genres
      .map((genre: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/genres/${genre.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}
    
    ${tags
      .map((tag: any) => {
        return `
      <url>
        <loc>${`${BASE_URL}/tags/${tag.slug}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
      })
      .join('')}

    </urlset>
  `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const getAll = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/sitemap`);
  const { authors, books, genres, tags } = await getAll.json();

  // We generate the XML sitemap with the data
  const sitemap = generateSiteMap(authors, books, genres, tags);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
