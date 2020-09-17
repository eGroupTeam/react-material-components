import { enUS, zhTW } from 'date-fns/locale';

export default function getDateFnsLocale(locale: string) {
  switch (locale) {
    case 'zh-tw':
      return zhTW;
    default:
      return enUS;
  }
}
