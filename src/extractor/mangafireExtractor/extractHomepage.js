import { load } from 'cheerio';

export const extractHomepage = (html) => {
  const $ = load(html);
  const resObj = {
    spotlight: [],
    mostViewed: {
      day: [],
      week: [],
      month: [],
    },
    recentlyUpdated: [],
    newRelease: [],
  };

  // extract spotlight by grabing only spotlight element
  const $spotlight = $('#top-trending .trending .swiper-slide');

  $spotlight.each((i, el) => {
    const spotlightObj = {
      title: null,
      id: null,
      poster: null,
      status: null,
      chapters: null,
      genres: [],
      synopsis: null,
    };
    const $above = $(el).find('.above');

    spotlightObj.status = $above.find('span').first().text() || null;

    const titleEl = $above.find('.unit');

    spotlightObj.title = titleEl.text() || null;
    spotlightObj.id = titleEl.attr('href').split('/').pop() || null;

    const $below = $(el).find('.below');

    spotlightObj.synopsis = $below.find('span').first().text() || null;
    spotlightObj.chapters = $below.find('p').first().text() || null;
    $below
      .find('div')
      .first()
      .find('a')
      .each((i, inEl) => {
        spotlightObj.genres.push($(inEl).text().toLowerCase() || null);
      });
    spotlightObj.poster = $(el).find('.poster img').attr('src') || null;

    resObj.spotlight.push(spotlightObj);
  });

  // extract most viewed by grabing only id=most-viewed element
  const $mostViewed = $('#most-viewed');

  const extractMostViewed = (time) => {
    $mostViewed
      .find(`.tab-content[data-name="${time}"]`)
      .find('.swiper .swiper-slide')
      .each((i, el) => {
        const mostViewdObj = {
          id: null,
          poster: null,
          title: null,
        };
        mostViewdObj.id = $(el).find('a').attr('href').split('/').pop() || null;
        mostViewdObj.poster = $(el).find('.poster img').attr('src') || null;
        mostViewdObj.title = $(el).find('span').first().text() || null;

        resObj.mostViewed[time].push(mostViewdObj);
      });
  };
  extractMostViewed('day');
  extractMostViewed('month');
  extractMostViewed('week');

  // extract recentlyupdated by grabing only second section element
  const $recentlyUpdated = $('section')
    .eq(1)
    .find(`.tab-content[data-name="all"]`);

  $recentlyUpdated.find('.unit').each((i, el) => {
    const recentlyUpdatedObj = {
      title: null,
      id: null,
      poster: null,
      type: null,
      chapters: {
        totalChapters: null,
        latestChapter: null,
        lastUpdated: null,
      },
    };
    const posterEl = $(el).find('.poster');
    recentlyUpdatedObj.id = posterEl.attr('href').split('/').pop() || null;
    recentlyUpdatedObj.poster = posterEl.find('img').attr('src') || null;

    const $info = $(el).find('.info');

    recentlyUpdatedObj.type =
      $info.find('div').first().find('.type').text() || null;

    recentlyUpdatedObj.title = $info.find('a').first().text().trim() || null;

    const $chapters = $(el).find('.content li').first().find('a');

    recentlyUpdatedObj.chapters.latestChapter =
      $chapters.attr('href').split('chapter-').pop() || null;

    recentlyUpdatedObj.chapters.totalChapters =
      $chapters.attr('href').split('chapter-').pop() || null;
    recentlyUpdatedObj.chapters.lastUpdated =
      $chapters.find('span').last().text().trim() || null;

    resObj.recentlyUpdated.push(recentlyUpdatedObj);
  });

  const $newRelease = $(`section[class="home-swiper"]`);

  $newRelease.find('.swiper-slide').each((i, el) => {
    const newReleaseObj = {
      id: null,
      title: null,
      poster: null,
    };
    newReleaseObj.id = $(el).find('a').attr('href').split('/').pop() || null;
    newReleaseObj.poster = $(el).find('img').attr('src') || null;
    newReleaseObj.title = $(el).find('span').text().trim() || null;

    resObj.newRelease.push(newReleaseObj);
  });

  return resObj;
};
