import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('book_quotes').select(`*`).order('id');
        res.status(200).json(data);
      } else {
        const { data: tags } = await supabase.from('book_tags').select(`*`).order('id');
        const { data: quotes_tags } = await supabase
          .from('book_quotes_tags')
          .select(`*`)
          .eq('quote_id', query.id)
          .order('id');
        const { data: quotes } = await supabase.from('book_quotes').select(`*`).eq('id', query.id).order('id');

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
      if (!body.quote) {
        res.status(422).json({ error: 'Quote required' });
      } else {
        // get tags string from array
        let tags_string = ',';
        body.tags.forEach((item: any) => {
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
              tags: clean_tags_string,
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
        res.status(200).json({ message: 'Success add quote' });
      }
      break;

    case 'PUT':
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
        res.status(201).json({ message: 'Success update tag' });
      }
      break;

    case 'DELETE':
      if (!query.id) {
        res.status(422).json({ error: 'Id required' });
      } else {
        // delete tags related to quote in book_quotes_tags table
        const { error: errorQuotesTags } = await supabase.from('book_quotes_tags').delete().eq('quote_id', query.id);
        const { error } = await supabase.from('book_quotes').delete().eq('id', query.id);
        if (error || errorQuotesTags) {
          res.status(422).json({ error: error.message });
        }
        res.status(200).json({ message: 'Success delete quote' });
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
