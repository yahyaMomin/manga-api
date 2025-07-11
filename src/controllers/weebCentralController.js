import Manga from '../scraper';

const manga = await new Manga();
class WeebCentralControllers {
  async getHomepage() {
    const response = await manga.WeebCentral.getHomepage();
    return response;
  }
}

export default WeebCentralControllers;
