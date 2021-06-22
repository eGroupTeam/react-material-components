/* eslint-disable no-underscore-dangle */
import MobileDetect from 'mobile-detect';

export type Outcome = {
  phone?: string | 'Unknow';
  tablet?: string | 'Unknow';
  mobile?: string | 'Unknow';
  os?: string | 'Unknow';
  userAgent?: string | 'Unknow';
  mobileGrade?: string | 'Unknow';
  smallerSide?: number;
  key?: string;
  val?: boolean | number | string;
};

export default function getDeviceInfo() {
  if (typeof window !== 'undefined') {
    const md = new MobileDetect(window.navigator.userAgent);
    const rules = MobileDetect._impl.mobileDetectRules;
    const sections = ['phones', 'tablets', 'oss', 'uas', 'utils'];
    const outcome: Outcome[] = [];
    outcome.push({ phone: md.phone() ?? 'Unknow' });
    outcome.push({ tablet: md.tablet() ?? 'Unknow' });
    outcome.push({ mobile: md.mobile() ?? 'Unknow' });
    outcome.push({ os: md.os() ?? 'Unknow' });
    outcome.push({ userAgent: md.userAgent() ?? 'Unknow' });
    outcome.push({ mobileGrade: md.mobileGrade() ?? 'Unknow' });
    outcome.push({ smallerSide: MobileDetect._impl.getDeviceSmallerSide() });
    sections.forEach((section) => {
      Object.keys(rules[section])
        .filter((key) => md.is(key))
        .forEach((key) => {
          outcome.push({ key: `is(${key})`, val: true });
        });
    });
    Object.keys(rules.props).forEach((propKey) => {
      const versionStr = md.versionStr(propKey);
      if (versionStr) {
        outcome.push({
          key: `versionStr(${propKey})`,
          val: versionStr,
        });
      }

      const version = md.version(propKey);
      if (version) {
        outcome.push({ key: `version(${propKey})`, val: version });
      }
    });
    return outcome;
  }
  return undefined;
}
