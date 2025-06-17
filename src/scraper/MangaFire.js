import {
  extractHomepage,
  extractDetailpage,
  extractListpage,
} from '../extractor/mangafireExtractor/index';
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
      const data = await axiosInstance(this.baseurl + '/home');
      if (!data.success) throw new validationError();
      const response = extractHomepage(data.data);
      return response;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundError();
    }
  }

  async getDetails(id) {
    const endpoint = id === 'random' ? `/random` : `/manga/${id}`;
    try {
      const data = await axiosInstance(this.baseurl + endpoint);
      if (!data.success) throw new validationError();
      const response = extractDetailpage(data.data);
      return response;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundError();
    }
  }

  async getListpage(query, category, page = 1) {
    const endpoint = category
      ? `/${query}/${category.toLowerCase().replace(' ', '-')}?page=${page}`
      : `/${query}?page=${page}`;

    console.log(endpoint);

    try {
      const data = await axiosInstance(this.baseurl + endpoint);
      if (!data.success) throw new validationError();
      const response = extractListpage(data.data);
      return response;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundError();
    }
  }
}

export default MangaFire;
