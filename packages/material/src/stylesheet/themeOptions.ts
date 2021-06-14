export const egPalette = {
  text: {
    0: '#000000',
    1: '#373737',
    2: '#646464',
    3: '#979797',
    4: '#CACACA',
    5: '#F2F2F2',
  },
  primary: {
    0: '#004B71',
    1: '#0474AD',
    2: '#3690BD',
    3: '#68ACCE',
    4: '#B3D5E6',
    5: '#E5F1F7',
  },
  secondary: {
    0: '#B13D3D',
    1: '#E95050',
    2: '#ED7373',
    3: '#F29696',
    4: '#F8CACA',
    5: '#FDEDED',
  },
  info: {
    0: '#0097B9',
    1: '#05C7F2',
    2: '#37D2F5',
    3: '#69DDF7',
    4: '#B4EEFB',
    5: '#E6F9FE',
  },
  success: {
    0: '#3E9072',
    1: '#00BF78',
    2: '#33CC93',
    3: '#66D9AE',
    4: '#B2ECD6',
    5: '#E5F8F1',
  },
  warning: {
    0: '#CB9557',
    1: '#FFBC6E',
    2: '#FFC98B',
    3: '#FFD7A8',
    4: '#FFEBD3',
    5: '#FFF8F0',
  },
  error: {
    0: '#B13D3D',
    1: '#E95050',
    2: '#ED7373',
    3: '#F29696',
    4: '#F8CACA',
    5: '#FDEDED',
  },
};

export const palette = {
  text: {
    primary: egPalette.text[1],
    secondary: egPalette.text[2],
  },
  info: {
    dark: egPalette.info[0],
    main: egPalette.info[1],
    light: egPalette.info[2],
  },
  primary: {
    dark: egPalette.primary[0],
    main: egPalette.primary[1],
    light: egPalette.primary[2],
  },
  secondary: {
    dark: egPalette.secondary[0],
    main: egPalette.secondary[1],
    light: egPalette.secondary[2],
  },
  success: {
    dark: egPalette.success[0],
    main: egPalette.success[1],
    light: egPalette.success[2],
  },
  warning: {
    dark: egPalette.warning[0],
    main: egPalette.warning[1],
    light: egPalette.warning[2],
  },
  error: {
    dark: egPalette.error[0],
    main: egPalette.error[1],
    light: egPalette.error[2],
  },
  action: {
    disabledBackground: '#DCDCDC',
  },
};

export const egShadows = [
  'none',
  '0 3px 16px 0 rgba(10, 75, 109, 0.08)',
  '0 6px 26px 0 #efeff7',
  '0px 0px 30px 1px #0000001f',
];

export const egShape = {
  borderRadius: 30,
};

export const fontFamily = [
  'Poppins-Light',
  '"Segoe UI"',
  'SegoeUI',
  '"Microsoft JhengHei"',
  '微軟正黑體',
  '"SF Pro TC"',
  '"SF Pro Display"',
  '"SF Pro Icons"',
  '"PingFang TC"',
  '"Helvetica Neue"',
  '"Helvetica"',
  '"Arial"',
  'sans-serif',
].join(',');

export const typography = {
  fontFamily,
  h1: {
    fontSize: '3.75rem',
    fontWeight: 700,
    lineHeight: '4.5rem',
  },
  h2: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: '3.8125rem',
  },
  h3: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: '3.625rem',
  },
  h4: {
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: '2.75rem',
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '2.375rem',
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.8125rem',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
};
