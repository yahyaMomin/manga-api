import { describe, it, expect } from 'vitest';
import Manga from '../src/scraper';

const manga = new Manga();
// describe('homepage', () => {
//   it('should return homepage', async () => {
//     const response = await manga.WeebCentral.getHomepage();

//     expect(response.latestUpdates).toBeGreaterThan(0);
//     expect(response.hotUpdates).toBeGreaterThan(0);
//     expect(response.recommended).toBeGreaterThan(0);
//   });
// });
describe('listpage', () => {
  it('should return listpage', async () => {
    const queries = {
      page: '1',
      keyword: '',
      auhtor: '',
      sort: 'popularity',
      order: 'descending',
      official: 'Any',
      anime: 'Any',
      adult: 'Any',
      status: '',
      type: '',
      genres: '',
    };
    const searchResult = {
      ...queries,
      keyword: 'one',
    };
    const response = await manga.WeebCentral.getListpage(searchResult);

    console.log(response.response.length);

    expect(response.response.length).toBeGreaterThan(0);
  });
});
