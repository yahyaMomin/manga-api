import Manga from '../../scraper';
import { validationError } from '../../utils/error';
import { genres, types, validQueries } from '../../utils/mangafireStatics';

const manga = new Manga();
class MangafireControllers {
  async getHomepage() {
    const response = await manga.MangaFire.getHomePage();
    return response;
  }

  async getDetailpage(c) {
    const id = c.req.param('id');
    const response = await manga.MangaFire.getDetails(id);
    return response;
  }
  async getListpage(c) {
    let { query, category = null } = c.req.param();
    const page = parseInt(c.req.query('page')) || 1;

    if (query !== 'type' && query !== 'genre') category = null;

    if (!validQueries.includes(query)) throw new validationError('invalid query', { validQueries });

    if ((query === 'type' || query === 'genre') && category === null) {
      throw new validationError(`category is required with query ${query}`);
    }

    function normalize(str) {
      return str.toLowerCase().replace(/[-\s]/g, '');
    }
    if (query === 'type' && !types.some((g) => normalize(g) === normalize(category))) {
      throw new validationError('category is not valid', { validcategries: types });
    }
    if (query === 'genre' && !genres.some((g) => normalize(g) === normalize(category))) {
      throw new validationError('category is not valid', { validcategries: genres });
    }

    const response = await manga.MangaFire.getListpage(query, category, page);
    return response;
  }

  async getContents(c) {
    const id = c.req.param('id');
    const { data_by = 'chapter', lang = 'en' } = c.req.query();
    const response = await manga.MangaFire.getContents(id, data_by, lang);
    return response;
  }
  async getImages(c) {
    const id = c.req.param('id');

    const response = await manga.MangaFire.getImages(id);

    return response;
  }
}

export default MangafireControllers;
