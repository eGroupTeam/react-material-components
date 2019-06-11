export default function parseToIntlLang(lang) {
  if (lang === 'zh-tw') return 'zh';
  if (lang === 'en-us') return 'en';
  return lang;
}
