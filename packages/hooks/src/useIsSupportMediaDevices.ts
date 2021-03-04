import { useEffect, useMemo, useState } from 'react';
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window ? window.navigator.userAgent : '');

export type SupportMediaDevicesInfo = {
  iosVersionNotSupprot?: boolean;
  iosBrowserNotSupport?: boolean;
  androidBrowserNotSupport?: boolean;
  otherBrowserNotSupport?: boolean;
};
/**
 * To check user environment is supprot mediaDevices.
 */
export default function useIsSupportMediaDevices(): [
  boolean,
  SupportMediaDevicesInfo
] {
  const [info, setInfo] = useState<SupportMediaDevicesInfo>({});
  const isSupportMediaDevices = useMemo(
    () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    []
  );

  useEffect(() => {
    if (isSupportMediaDevices) return;
    const os = md.os();
    if (os === 'iOS') {
      if (md.version('iOS') < 11) {
        setInfo({
          iosVersionNotSupprot: true,
        });
      } else {
        setInfo({
          iosBrowserNotSupport: true,
        });
      }
    } else if (os === 'AndroidOS') {
      setInfo({
        androidBrowserNotSupport: true,
      });
    } else {
      setInfo({
        otherBrowserNotSupport: true,
      });
    }
  }, [isSupportMediaDevices]);

  return [isSupportMediaDevices, info];
}
