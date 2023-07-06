import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data } = await supabase
        .from('book_quotes')
        .select(`id, author_id, quote, book_authors (id, name, slug, image)`)
        .order('id');
      const { data: tags } = await supabase.from('book_tags').select(`id, name, slug`).order('id');
      const { data: quote_tags } = await supabase.from('book_quotes_tags').select(`*`).order('id');

      // comparing quotes table with quotes_tags table to get all tags id related to quote
      const quote_all_tags_id = [];
      for (const a of data) {
        let temp = [];
        for (const quote_tag of quote_tags) {
          if (a.id == quote_tag.quote_id) {
            temp.push({
              ...quote_tag,
            });
          }
        }
        quote_all_tags_id.push({
          ...a,
          tags_array_id: temp,
        });
      }
      // Code above creating object like this
      // [
      //   {
      //     "id": 2,
      //     "author_id": 217,
      //     "quote": "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      //     "book_authors": {
      //       "id": 217,
      //       "name": "Albert Einstein"
      //     },
      //     "tags_array_id": [
      //       {
      //         "id": 2,
      //         "quote_id": 2,
      //         "tag_id": 4,
      //       },
      //       {
      //         "id": 3,
      //         "quote_id": 2,
      //         "tag_id": 5,
      //       }
      //     ]
      //   }
      // ]
      // from object above we can compare the tags_array_id key to tags table
      // comparing quote_all_tags_id variabel with tags table to get all tags name related to quote
      const quote_all_tags_name = [];
      for (const a of quote_all_tags_id) {
        let temp = [];
        for (const b of a.tags_array_id) {
          for (const tag of tags) {
            if (b.tag_id == tag.id) {
              temp.push({
                ...tag,
              });
            }
          }
        }
        // here we change the structure of object
        quote_all_tags_name.push({
          id: a.id,
          quote: a.quote,
          author: a.book_authors,
          tags: temp,
        });
      }

      // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(quote_all_tags_name);
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
