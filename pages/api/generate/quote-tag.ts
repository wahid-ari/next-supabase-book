import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import quotes_tags from '@data/quotes_tags.json' assert { type: 'json' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    // case 'GET':
    //   if (!query.generate) {
    //     const { data } = await supabase.from('book_quotes_tags').select(`*`).order('id');
    //     res.status(200).send(JSON.stringify(data, null, 2));
    //   } else if (query.generate == 'true') {
    //     const { data, error } = await supabase.from('book_quotes_tags').insert(quotes_tags);
    //     res.status(200).json(data);
    //   } else {
    //     const { data } = await supabase
    //       .from('book_quotes_tags')
    //       .select(`*, book_quotes (*), book_quotes_quotes_tags (*)`)
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
