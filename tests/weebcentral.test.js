import { describe, it, expect } from 'vitest';
import Manga from '../src/scraper';

const manga = new Manga();
describe('homepage', () => {
  it('should return homepage', async () => {
    const response = await manga.WeebCentral.getHomepage();
    console.log(response);

    expect(response.length).greaterThan(0);
  });
});
