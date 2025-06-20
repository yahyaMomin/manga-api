import { load } from 'cheerio';

const extractChapters = (html) => {
  const $ = load(html);

  let response = [];
  $('.item').each((_, el) => {
    const resObj = {
      dataNumber: null,
      id: null,
      title: null,
      releaseDate: null,
    };
    const $el = $(el);

    resObj.dataNumber = Number($el.attr('data-number')) || null;
    resObj.id =
      $el
        .find('a')
        .attr('href')
        ?.replace(/^\/read\//, '')
        .replaceAll('/', ':') || null;
    resObj.title = $el.find('a span').first().text().split(':').pop().trim() || null;
    resObj.releaseDate = $el.find('a span').last().text() || null;

    response.push(resObj);
  });

  response = response.reverse();
  console.log(JSON.stringify(response, null, 2));
  return response;
};

export default extractChapters;
