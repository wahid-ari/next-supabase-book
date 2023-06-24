## Design Ref

https://preview.themeforest.net/item/bookworm-bookstore-bookshop-ecommerce-html-template/full_screen_preview/26621064?_ga=2.78782877.842135492.1687606690-1073811402.1652419760

## Database Design

[DrawSQL](https://drawsql.app/teams/wahid-ari/diagrams/book)

![Image External](https://raw.githubusercontent.com/wahid-ari/next-supabase-book/master/public/database.png)

## Supabase

create function to search in table (book_books) using multiple columns (title, isbn)

// https://supabase.com/docs/guides/database/full-text-search#search-multiple-columns
// create function in supabase > sql editor > new query

```sql
 create function title_isbn(book_books) returns text as $$
   select $1.title || ' ' || $1.isbn;
 $$ language sql immutable;
```

// view function in supabase > database > function

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
