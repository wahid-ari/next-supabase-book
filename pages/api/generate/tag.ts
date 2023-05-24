import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import tags from '@data/tags.json' assert { type: 'json' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_tags').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      } else if (query.generate == 'true') {
        const { data } = await supabase.from('book_tags').insert(tags);
        res.status(200).json(data);
      } else {
        const { data } = await supabase
          .from('book_tags')
          .select(`*, book_quotes (*), book_quotes_tags (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
