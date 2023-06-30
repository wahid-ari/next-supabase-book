import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getSessionToken, writeLogs } from '@libs/supabase';
import slug from 'slug';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id && !query.slug) {
        const { data } = await supabase.from('book_tags').select(`*`).order('id');
        res.status(200).json(data);
      } else if (query.slug && query.seo) {
        const { data } = await supabase.from('book_tags').select(`name`).eq('slug', query.slug).single();
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else {
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: tags } = await supabase.from('book_tags').select(`*`).eq(column, param).order('id');
        const { data: quotes_tags } = await supabase
          .from('book_quotes_tags')
          .select(`*`)
          .eq('tag_id', tags[0].id)
          .order('id');
        const { data: quotes } = await supabase
          .from('book_quotes')
          .select(`*, book_authors (id, slug, name, image)`)
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
          let nameSlug = slug(body.name);
          const { data: isSlugExist } = await supabase.from('book_tags').select(`*`).eq('slug', nameSlug).order('id');
          // if slug already exist, add tags.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: tags } = await supabase.from('book_tags').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${tags.length + 1}`;
          }
          const { error } = await supabase.from('book_tags').insert([
            {
              slug: nameSlug,
              name: body.name,
              link: body.link,
            },
          ]);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'tag');
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
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'tag', body.id);
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
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'tag', query.id);
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
