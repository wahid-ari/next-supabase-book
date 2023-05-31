import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import quotes from '@data/quotes.json' assert { type: 'json' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  // Removing tags_array
  for (const quote of quotes) {
    delete quote.tags_array;
  }

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_quotes').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      } else if (query.generate == 'true') {
        const { data, error } = await supabase.from('book_quotes').insert(quotes);
        res.status(200).json(data);
      } else {
        const { data } = await supabase
          .from('book_quotes')
          .select(`*, book_books (*), book_quotes_quotes (*)`)
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
