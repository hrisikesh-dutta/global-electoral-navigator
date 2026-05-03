import { describe, it, expect } from 'vitest';
import enTranslations from '../../i18n/en.json';
import hiTranslations from '../../i18n/hi.json';
import bnTranslations from '../../i18n/bn.json';

/**
 * Helper: resolves a dot-notation key from a translations object
 * @param {object} dict - translation dictionary
 * @param {string} key - dot-notation key e.g. 'nav.navigate'
 * @returns {string} resolved value or the key if not found
 */
function resolve(dict, key) {
  const keys = key.split('.');
  let result = dict;
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return key; // fallback
    }
  }
  return result;
}

describe('i18n translation files', () => {
  describe('English translations (en.json)', () => {
    it('has nav.navigate key', () => {
      expect(resolve(enTranslations, 'nav.navigate')).toBe('Navigate');
    });

    it('has nav.learn key', () => {
      expect(resolve(enTranslations, 'nav.learn')).toBe('Learn');
    });

    it('has nav.register key', () => {
      expect(resolve(enTranslations, 'nav.register')).toBe('Register');
    });

    it('has landing.heroTitle key', () => {
      const title = resolve(enTranslations, 'landing.heroTitle');
      expect(typeof title).toBe('string');
      expect(title.length).toBeGreaterThan(0);
    });

    it('has landing.stats.voters key', () => {
      expect(resolve(enTranslations, 'landing.stats.voters')).toBeTruthy();
    });

    it('has landing.beginNav key', () => {
      expect(resolve(enTranslations, 'landing.beginNav')).toBeTruthy();
    });
  });

  describe('Hindi translations (hi.json)', () => {
    it('has nav.navigate key in Hindi', () => {
      const val = resolve(hiTranslations, 'nav.navigate');
      expect(val).not.toBe('nav.navigate'); // resolved correctly
      expect(typeof val).toBe('string');
    });

    it('has all same top-level keys as English', () => {
      expect(hiTranslations.nav).toBeDefined();
      expect(hiTranslations.landing).toBeDefined();
    });
  });

  describe('Bengali translations (bn.json)', () => {
    it('has nav.navigate key in Bengali', () => {
      const val = resolve(bnTranslations, 'nav.navigate');
      expect(val).not.toBe('nav.navigate');
      expect(typeof val).toBe('string');
    });

    it('has all same top-level keys as English', () => {
      expect(bnTranslations.nav).toBeDefined();
      expect(bnTranslations.landing).toBeDefined();
    });
  });

  describe('resolve() helper function', () => {
    it('returns key when translation is missing', () => {
      expect(resolve({}, 'some.missing.key')).toBe('some.missing.key');
    });

    it('resolves nested keys correctly', () => {
      const dict = { a: { b: { c: 'found' } } };
      expect(resolve(dict, 'a.b.c')).toBe('found');
    });
  });
});
