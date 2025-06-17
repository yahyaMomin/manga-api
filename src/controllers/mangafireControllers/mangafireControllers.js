import Manga from '../../scraper';
import { genres, types } from '../../utils/mangafireStatics';
import { fail, success } from '../../utils/response';

const manga = new Manga();
class MangafireControllers {
  async getHomepage(c) {
    try {
      const response = await manga.MangaFire.getHomePage();
      return success(c, response);
    } catch (error) {
      console.log(error.message);
      return fail(c);
    }
  }

  async getDetailpage(c) {
    try {
      const id = c.req.param('id');
      const response = await manga.MangaFire.getDetails(id);
      return success(c, response);
    } catch (error) {
      console.log(error.message);
      return fail(c);
    }
  }
  async getListpage(c) {
    const { query, category = null } = c.req.param();
    const page = parseInt(c.req.query('page')) || 1;

    if ((query === 'type' || query === 'genre') && category === null) {
      return fail(c, `category is required with query ${query}`);
    }

    if (query === 'type' && !types.includes(category)) {
      return fail(c, `category is not valid`, 400, { validcategries: types });
    }
    if (query === 'genre' && !genres.includes(category)) {
      return fail(c, `category is not valid`, 400, { validcategries: genres });
    }
    try {
      const response = await manga.MangaFire.getListpage(query, category, page);
      return success(c, response);
    } catch (error) {
      console.log(error.message);

      return fail(c);
    }
  }
}

export default MangafireControllers;
