import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import books from '@data/books.json' assert { type: 'json' };
import slug from 'slug';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  // Removing tags_array
  for (const quote of books) {
    delete quote.genre_array;
  }

  switch (method) {
    // case 'GET':
    //   if (!query.generate && !query.slug) {
    //     const { data } = await supabase.from('book_books').select(`*`).order('id');
    //     res.status(200).send(JSON.stringify(data, null, 2));
    //   } else if (query.generate == 'true') {
    //     const { data, error } = await supabase.from('book_books').insert(books);
    //     res.status(200).json(data);
    //   } else if (query.slug == 'true') {
    //     const { data } = await supabase.from('book_books').select(`*`).order('id');
    //     for (const row of data) {
    //       // console.log(row.title);
    //       let splitTitle = row.title?.split('(')[0];
    //       // console.log(splitTitle);
    //       let sliceTitle = splitTitle.slice(0, 80);
    //       let nameSlug = slug(sliceTitle);
    //       const { data: isSlugExist } = await supabase.from('book_books').select(`*`).eq('slug', nameSlug).order('id');
    //       // if slug already exist, add id to slug to make it unique
    //       if (isSlugExist.length > 0) {
    //         nameSlug = `${nameSlug}-${row.id}`;
    //       }
    //       // console.log('----------------------------------------------------\n');
    //       const { error } = await supabase
    //         .from('book_books')
    //         .update({
    //           slug: nameSlug,
    //         })
    //         .eq('id', row.id);
    //     }
    //     res.status(200).json(data);
    //   } else {
    //     const { data } = await supabase
    //       .from('book_books')
    //       .select(`*, book_books (*), book_books_books (*)`)
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
