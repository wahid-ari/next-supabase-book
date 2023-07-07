import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import genres from '@data/genres.json' assert { type: 'json' };
import slug from 'slug';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    // case 'GET':
    //   if (!query.generate && !query.slug) {
    //     const { data } = await supabase.from('book_genres').select(`*`).order('id');
    //     res.status(200).send(JSON.stringify(data, null, 2));
    //   } else if (query.generate == 'true') {
    //     const { data } = await supabase.from('book_genres').insert(genres);
    //     res.status(200).json(data);
    //   } else if (query.slug == 'true') {
    //     const { data } = await supabase.from('book_genres').select(`*`).order('id');
    //     for (const row of data) {
    //       let nameSlug = slug(row.name);
    //       const { data: isSlugExist } = await supabase.from('book_genres').select(`*`).eq('slug', nameSlug).order('id');
    //       // if slug already exist, add id to slug to make it unique
    //       if (isSlugExist.length > 0) {
    //         nameSlug = `${nameSlug}-${row.id}`;
    //       }
    //       const { error } = await supabase
    //         .from('book_genres')
    //         .update({
    //           slug: nameSlug,
    //         })
    //         .eq('id', row.id);
    //     }
    //     res.status(200).json(data);
    //   } else {
    //     const { data } = await supabase
    //       .from('book_genres')
    //       .select(`*, book_books (*), book_quotes_genres (*)`)
    //       .eq('id', query.id)
    //       .order('id');
    //     res.status(200).json(data);
    //   }
    //   break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
