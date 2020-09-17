import React from 'react';
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);

/**
 * To check user environment is supprot mediaDevices.
 */
export default function useIsSupportMediaDevices() {
  const [info, setInfo] = React.useState();
  const isSupportMediaDevices =
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  React.useEffect(() => {
    if (isSupportMediaDevices) return;
    if (md.os() === 'iOS') {
      if (md.version('iOS') < 11) {
        setInfo({
          title: '不支援此 iOS 版本',
          message: 'iOS 版本需要 11 以上才可以使用。',
        });
      } else {
        setInfo({
          title: '不支援此瀏覽器',
          message: '請使用 safari 開啟網頁。',
        });
      }
    } else {
      setInfo({
        title: '不支援此瀏覽器',
        message: '請使用 chrome 開啟網頁。',
      });
    }
  });

  return [isSupportMediaDevices, info];
}
