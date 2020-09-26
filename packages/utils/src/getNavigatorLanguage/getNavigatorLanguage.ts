export default function getNavigatorLanguage() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0].toLowerCase();
  }
  return navigator.language.toLowerCase();
}
