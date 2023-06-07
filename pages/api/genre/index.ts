import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('book_genres').select(`*`).order('id');
        res.status(200).json(data);
      } else if (query.id && query.seo) {
        const { data } = await supabase.from('book_genres').select(`name`).eq('id', query.id).single();
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else {
        const { data: genres } = await supabase.from('book_genres').select(`*`).eq('id', query.id).order('id');
        const { data: books_genres } = await supabase
          .from('book_books_genres')
          .select(`*`)
          .eq('genre_id', query.id)
          .order('id');
        const { data: books } = await supabase
          .from('book_books')
          .select(`id, title, published, image, book_authors (id, name, image)`)
          .order('id');

        const books_by_genres = [];
        for (const book of books) {
          for (const genre of books_genres) {
            if (genre.book_id == book.id) {
              books_by_genres.push({
                ...book,
              });
            }
          }
        }
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...genres[0], books_by_genres });
      }
      break;

    case 'POST':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
      } else {
        const { error } = await supabase.from('book_genres').insert([
          {
            name: body.name,
            link: body.link,
          },
        ]);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(200).json({ message: 'Success add genre' });
      }
      break;

    case 'PUT':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
      } else {
        const { error } = await supabase
          .from('book_genres')
          .update({
            name: body.name,
            link: body.link,
          })
          .eq('id', body.id);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(201).json({ message: 'Success update genre' });
      }
      break;

    case 'DELETE':
      if (!header) return res.status(401).json({ error: 'Please provide bearer token in headers' });
      const { data: session } = await supabase.from('book_sessions').select('*').eq('token', token).single();
      if (session) {
        if (!query.id) {
          res.status(422).json({ error: 'Id required' });
        } else {
          const { error } = await supabase.from('book_genres').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success delete genre' });
        }
      } else {
        res.status(401).json({ message: 'Token invalid' });
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
