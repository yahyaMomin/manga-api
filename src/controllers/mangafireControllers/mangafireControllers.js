import Manga from '../../scraper';
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
}

export default MangafireControllers;
