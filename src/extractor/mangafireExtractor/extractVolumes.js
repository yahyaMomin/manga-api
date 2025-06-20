import { load } from 'cheerio';
import { mangafireBaseUrl } from '../../utils/baseurls';

const extractVolumes = (html) => {
  const $ = load(html);
  let response = [];

  $('.item').each((_, el) => {
    const resObj = {
      dataNumber: null,
      id: null,
      title: null,
      poster: null,
    };
    const $el = $(el);

    resObj.dataNumber = parseInt($el.attr('data-number')) ?? null;
    resObj.id =
      $el
        .find('a')
        .attr('href')
        ?.replace(/^\/read\//, '')
        .replaceAll('/', ':') || null;
    resObj.title = $el.find('a span').first().text().trim() || null;

    const $poster = $el.find('.poster img').attr('src') || null;

    resObj.poster = $poster.startsWith('assets') ? `${mangafireBaseUrl}/${$poster}` : $poster;
    response.push(resObj);
  });

  response = response.reverse();
  console.log(JSON.stringify(response, null, 2));
  return response;
};

export default extractVolumes;
