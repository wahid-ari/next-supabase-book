import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

async function getSessionToken(res: NextApiResponse, header: string, token: string) {
  if (!header) return res.status(401).json({ error: 'Please provide bearer token in headers' });
  const { data } = await supabase.from('book_sessions').select('*').eq('token', token).single();
  if (data) return data;
  else res.status(401).json({ message: 'Token invalid' });
}

async function writeLogs(user_id: number, action: string, table: string = '', data_id: string | string[] = '') {
  const { error } = await supabase.from('book_logs').insert([
    {
      user_id: user_id,
      action: action,
      table: table,
      description: `user ${user_id} ${action} book_tags ${data_id}`,
    },
  ]);
  return error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('book_tags').select(`*`).order('id');
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else if (query.id && query.seo) {
        const { data } = await supabase.from('book_tags').select(`name`).eq('id', query.id).single();
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else {
        const { data: tags } = await supabase.from('book_tags').select(`*`).eq('id', query.id).order('id');
        const { data: quotes_tags } = await supabase
          .from('book_quotes_tags')
          .select(`*`)
          .eq('tag_id', query.id)
          .order('id');
        const { data: quotes } = await supabase
          .from('book_quotes')
          .select(`*, book_authors (id, name, image)`)
          .order('id');

        const quotes_by_tags = [];
        for (const tag of quotes_tags) {
          for (const quote of quotes) {
            if (tag.quote_id == quote.id) {
              quotes_by_tags.push({
                ...quote,
              });
            }
          }
        }
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...tags[0], quotes_by_tags });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
        } else {
          const { error } = await supabase.from('book_tags').insert([
            {
              name: body.name,
              link: body.link,
            },
          ]);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'book_tags');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success add tag' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
        } else {
          const { error } = await supabase
            .from('book_tags')
            .update({
              name: body.name,
              link: body.link,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'book_tags', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(201).json({ message: 'Success update tag' });
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ error: 'Id required' });
        } else {
          const { error } = await supabase.from('book_tags').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'book_tags', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success delete tag' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
