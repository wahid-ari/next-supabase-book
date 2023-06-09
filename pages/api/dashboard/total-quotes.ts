import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: quotes } = await supabase.from('book_quotes').select(`id`, { count: 'exact' });
      // const { count: quotes } = await supabase.from('book_quotes').select(`*`, { count: 'exact', head: true });
      // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   quotes: quotes,
      // });
      res.status(200).json({
        quotes: quotes.length,
      });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
