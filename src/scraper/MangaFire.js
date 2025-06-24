import { load } from 'cheerio';
import {
  extractHomepage,
  extractDetailpage,
  extractListpage,
  extractChapters,
  extractVolumes,
} from '../extractor/mangafireExtractor/index';
import { axiosInstance } from '../services/axiosInstance';
import { mangafireBaseUrl } from '../utils/baseurls';
import { validationError } from '../utils/error';

class MangaFire {
  baseurl = mangafireBaseUrl;
  ajaxurl = `${mangafireBaseUrl}/ajax`;
  name = 'mangafire';

  async getHomePage() {
    const data = await axiosInstance(this.baseurl + '/home');
    if (!data.success) throw new validationError();
    const response = extractHomepage(data.data);
    return response;
  }

  async getDetails(id) {
    const endpoint = id === 'random' ? `/random` : `/manga/${id}`;
    const data = await axiosInstance(this.baseurl + endpoint);
    if (!data.success) throw new validationError('please dubble check id is correct');
    const response = extractDetailpage(data.data);
    return response;
  }

  async getListpage(query, category, page = 1) {
    const endpoint = category
      ? `/${query}/${category.toLowerCase().replace(' ', '-')}?page=${page}`
      : `/${query}?page=${page}`;

    console.log(endpoint);

    const data = await axiosInstance(this.baseurl + endpoint);
    if (!data.success) throw new validationError();
    const response = extractListpage(data.data);
    return response;
  }

  async getContents(id, dataBy, lang) {
    const idCode = id.split('.').pop();
    const data = await axiosInstance(
      this.ajaxurl + `/manga/${idCode}/${dataBy.toLowerCase()}/${lang.toLowerCase()}`,
      {
        Referer: this.baseurl + `/manga/${id}`,
      },
      true
    );

    if (!data.success) throw new validationError();

    let response;
    if (dataBy === 'chapter') {
      response = extractChapters(data.data.result);
    } else {
      response = extractVolumes(data.data.result);
    }

    if (response.length < 1) throw new validationError(`${dataBy}s not found`);

    const res = {
      dataBy,
      lang,
      id,
      response,
    };
    return res;
  }
  async getImages(id = null) {
    if (!id) throw new validationError('id is required');
    // blue-lockk.kw9j9:en:chapter-305

    const idArr = id.split(':');
    const chapterArr = idArr.pop().split('-');

    const mangaId = idArr[0];
    const lang = idArr[1];
    const dataNumber = Number(chapterArr.pop());
    const type = chapterArr[0];

    const endpoint = this.ajaxurl + `/read/${mangaId.split('.').pop()}/${type}/${lang}`;
    console.log(endpoint);

    const data = await axiosInstance(
      endpoint,
      {
        Referer: this.baseurl + `/read/${mangaId}`,
      },
      true
    );

    if (!data.success) throw new validationError();

    const $ = load(data.data.result.html);

    const dataId = $(`ul li a[data-number="${dataNumber}"]`).attr('data-id');

    const chaptersResponse = await axiosInstance(
      this.ajaxurl + `/read/${type}/${dataId}`,
      {
        Referer: this.baseurl + `/read/${mangaId}`,
      },
      true
    );

    if (!chaptersResponse.success) throw new validationError();

    const imageUrls = chaptersResponse.data.result.images.map((imageArr) => imageArr[0]);

    const response = {
      mangaId,
      lang,
      dataBy: type,
      dataNumber,
      response: imageUrls,
    };

    return response;
  }
}

export default MangaFire;
