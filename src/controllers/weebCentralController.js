import Manga from '../scraper';
import weebcentralStatics from '../utils/weebcentralStatics';

const manga = await new Manga();
class WeebCentralControllers {
  async getHomepage() {
    const response = await manga.WeebCentral.getHomepage();
    return response;
  }
  // .1 https://weebcentral.com/search/data?author=&text=&sort=Best Match&order=Descending&official=Any&anime=Any&adult=Any&display_mode=Full Display
  // .2
  async getListpage(c) {
    const {
      author = '',
      keyword = '',
      page = 1,
      sort = 'Popularity',
      order = 'Descending',
      official = 'Any',
      anime = 'Any',
      adult = 'Any',
      status = '',
      type = '',
      genres = '',
    } = c.req.query();

    const response = await manga.WeebCentral.getListpage({
      author,
      keyword,
      page,
      sort,
      order,
      official,
      anime,
      adult,
      status,
      type,
      genres,
    });
    return response;
  }
  async getListpageMeta() {
    return weebcentralStatics;
  }
}

export default WeebCentralControllers;
