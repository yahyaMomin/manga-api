import { load } from 'cheerio';

const extractListpage = (html) => {
  const $ = load(`
        <body>
            ${html}
        </body>
    `);

  const response = [];

  const list = $('body > article');

  if (!list.length) return { meta: { hasNextpage: false }, response, message: 'data not found' };
  list.each((i, el) => {
    const obj = {
      title: null,
      id: null,
      posters: {
        small: null,
        normal: null,
        fallback: null,
      },
      year: null,
      status: null,
      type: null,
      authors: [],
      genres: [],
      offcialTranslation: false,
      animeAdaptation: false,
      adult: false,
    };

    const left = $(el).children('section').first();
    const right = $(el).children('section').last();
    obj.id = left.find('a').attr('href').split('/series/').pop().replace('/', ':') || null;
    const poster = left.find('picture');

    obj.posters.small = poster.children(`source[width="200"]`).attr('srcset') || null;
    obj.posters.normal = poster.children(`source[width="400"]`).attr('srcset') || null;
    obj.posters.fallback = poster.children('img').attr('src') || null;

    const firstDiv = right.children('.text-lg');

    obj.title = firstDiv.children('span').last().children('a').text() || null;

    obj.offcialTranslation = Boolean(
      firstDiv.children('span[data-tip="Official Translation"]').length
    );
    obj.animeAdaptation = Boolean(firstDiv.children('span[data-tip="Anime Adaptation"]').length);
    obj.adult = Boolean(firstDiv.children('span[data-tip="Adult Content"]').length);

    obj.year = right.children('div').eq(1).children('span').text();
    obj.status = right.children('div').eq(2).children('span').text();
    obj.type = right.children('div').eq(3).children('span').text();

    right
      .children('div')
      .eq(4)
      .find('a')
      .each((i, a) => obj.authors.push($(a).text()));

    right
      .children('div')
      .eq(5)
      .children('span')
      .each((_, g) => obj.genres.push($(g).text().replace(',', '')));

    response.push(obj);
  });

  const hasNextpage = Boolean($('button').length);
  return { meta: { hasNextpage }, response, message: null };
};

export default extractListpage;
