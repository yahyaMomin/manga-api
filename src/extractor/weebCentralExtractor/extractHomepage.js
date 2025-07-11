import { load } from 'cheerio';

function extractHomepage(html) {
  const $ = load(html);

  const response = [];
  const $sections = $('main > section');

  $sections
    .first()
    .find('article.flex')
    .each((i, el) => {
      const obj = {
        title: null,
        id: null,
        poster: null,
        totalChapters: null,
        lastUpdated: null,
      };
      const left = $(el).children('div').first();
      const right = $(el).children('div').last();

      obj.id = left.find('a').attr('href').split('series/').pop().replace('/', ':') || null;
      obj.poster = left.find('source').attr('srcset') || null;

      obj.title = right.find('a > .text-lg').text().trim() || null;

      obj.totalChapters =
        right.find('.items-center').first().find('span').text().split(' ').pop().trim() || null;
      obj.lastUpdated = right.find('.items-center').last().find('time').text() || null;

      response.push(obj);
    });

  return response;
}

export default extractHomepage;
