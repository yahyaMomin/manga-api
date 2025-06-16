import { describe, it, expect } from 'vitest';
import Manga from '../../src/scraper';

const manga = new Manga();

describe('mangafire homepage', () => {
  it('should return homepage with correct structure and non-empty fields', async () => {
    const result = await manga.MangaFire.getHomePage();

    // Check main object structure
    expect(result).toBeTypeOf('object');
    expect(result).toHaveProperty('spotlight');
    expect(result).toHaveProperty('mostViewed');
    expect(result).toHaveProperty('recentlyUpdated');
    expect(result).toHaveProperty('newRelease');

    // Check arrays are not empty
    expect(Array.isArray(result.spotlight)).toBe(true);
    expect(result.spotlight.length).toBeGreaterThan(0);

    expect(Array.isArray(result.recentlyUpdated)).toBe(true);
    expect(result.recentlyUpdated.length).toBeGreaterThan(0);

    expect(Array.isArray(result.newRelease)).toBe(true);
    expect(result.newRelease.length).toBeGreaterThan(0);

    // Check mostViewed structure
    expect(result.mostViewed).toBeTypeOf('object');
    expect(result.mostViewed).toHaveProperty('day');
    expect(result.mostViewed).toHaveProperty('week');
    expect(result.mostViewed).toHaveProperty('month');

    expect(Array.isArray(result.mostViewed.day)).toBe(true);
    expect(result.mostViewed.day.length).toBeGreaterThan(0);

    expect(Array.isArray(result.mostViewed.week)).toBe(true);
    expect(result.mostViewed.week.length).toBeGreaterThan(0);

    expect(Array.isArray(result.mostViewed.month)).toBe(true);
    expect(result.mostViewed.month.length).toBeGreaterThan(0);
  });
});
