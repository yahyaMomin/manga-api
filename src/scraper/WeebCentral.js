import { extractHomepage } from '../extractor/weebCentralExtractor';
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
}

export default WeebCentral;
