import { extractHomepage, extractListpage } from '../extractor/weebCentralExtractor';
import { axiosInstance } from '../services/axiosInstance';
import { weebCentralBaseUrl } from '../utils/baseurls';
import { validationError } from '../utils/error';

class WeebCentral {
  baseurl = weebCentralBaseUrl;
  ajaxurl = `${weebCentralBaseUrl}/ajax`;
  name = 'weebCentral';

  async getHomepage() {
    const data = await axiosInstance(this.baseurl);
    if (!data.success) throw new validationError();
    const response = extractHomepage(data.data);
    return response;
  }
  // author=&text=&sort=Best Match&order=Descending&official=Any&anime=Any&adult=Any&display_mode=Minimal Display

  async getListpage({
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
  } = {}) {
    let staticQueries = `sort=${capitalizeQuery(sort)}&order=${capitalizeQuery(order)}&official=${capitalizeQuery(official)}&anime=${capitalizeQuery(anime)}&adult=${capitalizeQuery(adult)}`;

    staticQueries = status
      ? `${staticQueries}${status
          .split(',')
          .map((s) => '&included_status=' + capitalizeQuery(s))
          .join('')}`
      : staticQueries;

    staticQueries = type
      ? `${staticQueries}${type
          .split(',')
          .map((t) => '&included_type=' + capitalizeQuery(t))
          .join('')}`
      : staticQueries;

    staticQueries = genres
      ? `${staticQueries}${genres
          .split(',')
          .map((g) => '&included_tag=' + capitalizeQuery(g))
          .join('')}`
      : staticQueries;

    const fullEndpoint =
      Number(page) === 1
        ? `author=${author}&text=${keyword}&${staticQueries}`
        : `limit=32&offset=${(Number(page) - 1) * 32}&${staticQueries}`;

    console.log(`${this.baseurl}/search/data?${fullEndpoint}&display_mode=Full Display`);

    const data = await axiosInstance(
      `${this.baseurl}/search/data?${fullEndpoint}&display_mode=Full Display`
    );
    if (!data.success) throw new validationError();

    const list = extractListpage(data.data);

    const { meta, response, message = '' } = list;
    return { meta: { ...meta, currentPage: Number(page) }, response, message };
  }
}

function capitalizeQuery(query) {
  if (query.includes(' ') || query.includes('+')) {
    const arr = query.split(' ');

    return `${capitalizeQuery(arr[0])} ${capitalizeQuery(arr[1])}`;
  } else {
    return query.charAt(0).toUpperCase() + query.slice(1);
  }
}
export default WeebCentral;
