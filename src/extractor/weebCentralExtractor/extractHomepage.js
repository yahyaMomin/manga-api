import { load } from 'cheerio';

function extractHomepage(html) {
  const $ = load(html);

  const response = {
    latestUpdates: [],
    hotUpdates: [],
    recommended: [],
  };
  const $sections = $('main > section');

  function getHomepage(order, dataType) {
    $sections
      .eq(order)
      .find('article.flex')
      .each((i, el) => {
        const obj = {
          title: null,
          id: null,
          posters: {
            normal: null,
            small: null,
            fallback: null,
          },
          totalChapters: null,
          lastUpdated: null,
        };

        const row = $(el).find('div > a').length ? $(el).find('div > a') : $(el).children('a');

        const left = row.first();
        const right = row.last();

        obj.id = left.attr('href').split('series/').pop().replace('/', ':') || null;

        const poster = left.find('picture');

        obj.posters.small = poster.find('source').attr('srcset') || null;
        obj.posters.normal =
          poster.find('source').attr('srcset').replace('/small/', '/normal/') || null;
        obj.posters.fallback = poster.find('img').attr('src') || null;

        obj.title = right.find('.text-lg').text().trim() || null;

        obj.totalChapters =
          right.find('.items-center').eq(order).find('span').text().split(' ').pop().trim() || null;
        obj.lastUpdated = right.find('time').text() || null;

        response[dataType].push(obj);
      });
  }
  getHomepage(0, 'hotUpdates');
  getHomepage(1, 'latestUpdates');

  $sections
    .last()
    .find('ul li')
    .each((i, el) => {
      const obj = {
        title: null,
        id: null,
        posters: {
          small: null,
          normal: null,
          fallback: null,
        },
      };
      const wrapper = $(el).find('a');
      obj.id = wrapper.attr('href').split('series/').pop().replace('/', ':') || null;

      const poster = wrapper.find('picture');
      obj.posters.normal = poster.find('source').attr('srcset') || null;
      obj.posters.small =
        poster.find('source').attr('srcset').replace('/normal/', '/small/') || null;
      obj.posters.fallback = poster.find('img').attr('src') || null;

      obj.title = wrapper.find('.text-lg').text() || null;

      response.recommended.push(obj);
    });

  return response;
}

export default extractHomepage;
