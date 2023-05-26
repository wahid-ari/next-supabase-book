import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: quotes_tags } = await supabase.from('book_quotes_tags').select(`*`).order('id');
      const { data: tags } = await supabase.from('book_tags').select(`*`).order('id');
      // Make an array of object structure
      let items = [];
      for (const tag of tags) {
        items.push({
          id: tag.id,
          label: tag.name,
          total: 0,
        });
      }
      // Count total quote that have same tag
      let result = [];
      for (const item of items) {
        for (const quote_tag of quotes_tags) {
          if (quote_tag.tag_id == item.id) {
            let filtered = items.filter((i) => i.id == quote_tag.tag_id)[0];
            filtered.total += 1;
            result.push(filtered);
          }
        }
      }
      // Remove duplicate values from an array of objects in javascript
      // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = result.reduce((unique, o) => {
        if (!unique.some((obj: any) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      let sortedData = data.sort((a: any, b: any) => b.total - a.total).slice(0, 10);
      res.status(200).json(sortedData);
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
