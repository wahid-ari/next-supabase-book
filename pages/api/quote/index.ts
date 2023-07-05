import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getSessionToken, writeLogs } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase
          .from('book_quotes')
          .select(`id, author_id, quote, book_authors (id, name, slug)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data: tags } = await supabase.from('book_tags').select(`*`).order('id');
        const { data: quotes_tags } = await supabase
          .from('book_quotes_tags')
          .select(`*`)
          .eq('quote_id', query.id)
          .order('id');
        const { data: quotes } = await supabase
          .from('book_quotes')
          .select(`*, book_authors (id, name, image)`)
          .eq('id', query.id)
          .order('id');

        const quotes_with_tags = [];
        for (const quotes_tag of quotes_tags) {
          for (const tag of tags) {
            if (quotes_tag.tag_id == tag.id) {
              quotes_with_tags.push({
                id: tag.id,
                name: tag.name,
              });
            }
          }
        }
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...quotes[0], tags_array: quotes_with_tags });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.quote) {
          res.status(422).json({ error: 'Quote required' });
        } else {
          // get tags string from array
          let tags_string = ',';
          body.tags?.forEach((item: any) => {
            tags_string = tags_string + ', ' + item.label;
          });
          let clean_tags_string = tags_string.replace(',,', '').replace(' ', '');
          // insert quote
          const { data, error } = await supabase
            .from('book_quotes')
            .insert([
              {
                author_id: body.author_id,
                quote: body.quote,
                tags: clean_tags_string == ',' ? '' : clean_tags_string,
              },
            ])
            .select();
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // get quote id after inserting
          const quoteId = data[0].id;
          // if new quote have tags
          if (body.tags?.length > 0) {
            // create array of tags of a quote
            let tags = [];
            body.tags.forEach((item: any) => {
              tags.push({
                quote_id: quoteId,
                tag_id: item.value,
              });
            });
            // insert tags of a quote to book_quotes_tags table
            const { error } = await supabase.from('book_quotes_tags').insert(tags);
            if (error) {
              res.status(422).json({ error: error.message });
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'quote');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success add quote' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.quote) {
          res.status(422).json({ error: 'Quote required' });
        } else {
          // get tags string from array
          let tags_string = ',';
          body.tags.forEach((item: any) => {
            tags_string = tags_string + ', ' + item.label;
          });
          let clean_tags_string = tags_string.replace(',,', '').replace(' ', '');
          // update quote
          const { error } = await supabase
            .from('book_quotes')
            .update({
              author_id: body.author_id,
              quote: body.quote,
              tags: clean_tags_string,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // delete tags related to edited quote
          const { error: errorQuotesTags } = await supabase.from('book_quotes_tags').delete().eq('quote_id', body.id);
          if (errorQuotesTags) {
            res.status(422).json({ error: errorQuotesTags.message });
          }
          // if edited quote have tags
          if (body.tags?.length > 0) {
            // create array of tags of a edited quote
            let tags = [];
            body.tags.forEach((item: any) => {
              tags.push({
                quote_id: body.id,
                tag_id: item.value,
              });
            });
            // insert tags of a edited quote to book_quotes_tags table
            const { error } = await supabase.from('book_quotes_tags').insert(tags);
            if (error) {
              res.status(422).json({ error: error.message });
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'quote', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(201).json({ message: 'Success update quote' });
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
          // delete tags related to quote in book_quotes_tags table
          const { error: errorQuotesTags } = await supabase.from('book_quotes_tags').delete().eq('quote_id', query.id);
          const { error } = await supabase.from('book_quotes').delete().eq('id', query.id);
          if (error || errorQuotesTags) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'quote', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success delete quote' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
