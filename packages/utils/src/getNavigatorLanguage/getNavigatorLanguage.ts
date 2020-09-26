const isBrowser = typeof navigator !== 'undefined';

export default function getNavigatorLanguage() {
  if (!isBrowser) return 'en';
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0].toLowerCase();
  }
  return navigator.language.toLowerCase();
}
