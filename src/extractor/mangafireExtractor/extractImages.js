import { load } from 'cheerio';

const extractImages = (html, dataNumber) => {
  const $ = load(html);

  const chapterId = $(`ul li a[data-number="${dataNumber}"]`).attr('data-id');

  console.log(chapterId);
};

export default extractImages;
