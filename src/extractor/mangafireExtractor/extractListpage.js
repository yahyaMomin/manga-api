import { load } from 'cheerio';

const extractListpage = (html) => {
  const $ = load(html);

  const resObj = {
    pageInfo: {
      currentpage: null,
      hasnextpage: null,
      totalpages: null,
    },
    response: [],
  };

  const $page = $('.pagination');

  resObj.pageInfo.currentpage = parseInt($page.find('.active .page-link').text()) || null;

  const $lastPage = $page.find('.page-item .page-link').last();

  const href = $lastPage.attr('href');
  resObj.pageInfo.hasnextpage = href ? true : false;

  const pageNumber = href
    ? parseInt(href.split('page=').pop())
    : parseInt($lastPage.text()) || null;

  resObj.pageInfo.totalpages = pageNumber;

  $('.container .original .unit').each((_, el) => {
    const responseObj = {
      title: null,
      id: null,
      poster: null,
      type: null,
      chapters: {
        totalChapters: null,
        lastUpdated: null,
        language: null,
      },
    };
    responseObj.poster = $(el).find('.poster img').attr('src') || null;

    const $info = $(el).find('.info');
    responseObj.type = $info.find('.type').text().trim() || null;
    responseObj.id = $info.find('a').attr('href').split('/').pop() || null;
    responseObj.title = $info.find('a').first().text().trim() || null;

    const $latestChap = $info.find('.content').first().find('li a');

    responseObj.chapters.totalChapters =
      parseInt($latestChap.find('span').first().text().split('Chap').pop()) ?? null;

    responseObj.chapters.language =
      $latestChap.find('span').first().find('b').text().trim() || null;
    responseObj.chapters.lastUpdated = $latestChap.find('span').last().text().trim() || null;

    resObj.response.push(responseObj);
  });

  return resObj;
};

export default extractListpage;
