import { describe, it, expect } from 'vitest';
import Manga from '../../src/scraper';

const manga = new Manga();

describe('mangafire homepage', () => {
  it('should return array of home field data', async () => {
    const result = await manga.MangaFire.getHomePage();

    // Check main object structure
    expect(result).not.toBe([]);
  });
});
describe('mangafire detailPage', () => {
  it('should return details of manga', async () => {
    const result = await manga.MangaFire.getDetails('random');

    // Check main object structure
    expect(result).toBeTypeOf('object');
    expect(result.data).not.toBe({});
  });
});
describe('mangafire listpage', () => {
  it('should return list of mangas', async () => {
    const result = await manga.MangaFire.getListpage('newest');

    // Check main object structure
    expect(result).toBeTypeOf('object');
    expect(result.data).not.toBe({});
  });
});
