import { load } from 'cheerio';

const extractDetailpage = (html) => {
  const $ = load(html);

  const resObj = {
    title: null,
    alternativeTitle: null,
    synopsis: null,
    id: null,
    poster: null,
    banner: null,
    status: null,
    type: null,
    authors: [],
    malScore: null,
    genres: [],
    published: {
      from: null,
      to: null,
    },
    mangazines: null,
    languages: [],
    recommended: [],
  };

  const $wrapper = $('#manga-page');

  resObj.banner = $wrapper.find('.detail-bg img').attr('src') || null;

  resObj.poster = $wrapper.find('.poster img').attr('src') || null;
  const $details = $wrapper.find('.main-inner .info');

  resObj.status = $details.find('p').first().text().trim() || null;
  resObj.title = $details.find('h1').first().text().trim() || null;
  resObj.alternativeTitle = $details.find('h6').first().text().trim() || null;

  resObj.id = $details.find('.actions a').attr('href').split('/').pop() || null;

  resObj.type = $details.find('.min-info a').first().text().trim() || null;
  resObj.malScore =
    $details
      .find('.min-info span')
      .last()
      .find('b')
      .text()
      .split('MAL')[0]
      .trim() || null;
  resObj.synopsis = $('#synopsis .modal-content').text().trim() || null;

  $wrapper.find('.meta > div').each((_, el) => {
    const label = $(el).find('span').first().text().trim().replace(':', '');
    const valueSpan = $(el).find('span').eq(1);

    if (label === 'Author') {
      resObj.authors = valueSpan
        .find('a')
        .map((_, a) => $(a).text().trim())
        .get();
    }

    if (label === 'Published') {
      const text = valueSpan.text().trim(); // "Jul 31, 2018 to ?"
      const [from, to] = text.split(' to ').map((t) => t.trim());
      resObj.published.from = from || null;
      resObj.published.to = to !== '?' ? to : null;
    }

    if (label === 'Genres') {
      resObj.genres = valueSpan
        .find('a')
        .map((_, a) => $(a).text().trim())
        .get();
    }

    if (label === 'Mangazines') {
      resObj.mangazines = valueSpan.find('a').text().trim();
    }
  });

  $wrapper
    .find('.list-menu .dropdown-menu')
    .first()
    .find('.dropdown-item')
    .each((_, el) => {
      const languageObj = {
        lang: null,
        totalChapters: null,
        langCode: null,
      };
      languageObj.lang = $(el).attr('data-title') || null;
      languageObj.langCode = $(el).attr('data-code') || null;
      languageObj.totalChapters =
        parseInt(
          $(el)
            .text()
            .match(/\((\d+)\s*Chapters\)/)[1]
        ) || null;

      resObj.languages.push(languageObj);
    });

  $wrapper.find('.side-manga .unit').each((_, el) => {
    const recommendedObj = {
      id: null,
      title: null,
      poster: null,
      chapters: null,
    };
    recommendedObj.id = $(el).attr('href').split('/').pop() || null;
    recommendedObj.poster = $(el).find('.poster img').attr('src') || null;
    recommendedObj.title = $(el).find('.info h6').text().trim() || null;
    recommendedObj.chapters =
      parseInt($(el).find('.info span').first().text().split('Chap ').pop()) ||
      null;

    resObj.recommended.push(recommendedObj);
  });

  return resObj;
};

export default extractDetailpage;
