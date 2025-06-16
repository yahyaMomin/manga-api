import { extractHomepage } from '../extractor/mangafireExtractor/extractHomepage';
import { axiosInstance } from '../services/axiosInstance';
import { mangafireBaseUrl } from '../utils/baseurls';
import { NotFoundError, validationError } from '../utils/error';

class MangaFire {
  baseurl = mangafireBaseUrl;
  name = 'mangafire';
  constructor(baseurl = null) {
    if (baseurl) this.baseurl = baseurl;
  }
  async getHomePage() {
    try {
      console.log('homepage called');
      const data = await axiosInstance(this.baseurl + '/home');
      if (!data.success) throw new validationError();
      const response = extractHomepage(data.data);
      return response;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundError();
    }
  }
}

export default MangaFire;
