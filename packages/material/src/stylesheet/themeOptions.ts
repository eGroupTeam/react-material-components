export const egPalette = {
  text: {
    0: '#000000',
    1: '#373737',
    2: '#646464',
    3: '#979797',
    4: '#CACACA',
    5: '#F2F2F2',
    6: '#F6F6F6',
  },
  primary: {
    0: '#004B71',
    1: '#0474AD',
    2: '#0474ADDD',
    3: '#0474ADAA',
    4: '#0474AD77',
    5: '#0474AD33',
    6: '#0474A00',
  },
  secondary: {
    0: '#B13D3D',
    1: '#E95050',
    2: '#E95050DD',
    3: '#E95050AA',
    4: '#E9505077',
    5: '#E9505033',
    6: '#E9505000',
  },
  info: {
    0: '#0097B9',
    1: '#05C7F2',
    2: '#05C7F2DD',
    3: '#05C7F2AA',
    4: '#05C7F277',
    5: '#05C7F233',
    6: '#05C7F200',
  },
  success: {
    0: '#3E9072',
    1: '#00BF78',
    2: '#00BF78DD',
    3: '#00BF78AA',
    4: '#00BF7877',
    5: '#00BF7833',
    6: '#00BF7800',
  },
  warning: {
    0: '#CB9557',
    1: '#FFBC6E',
    2: '#FFBC6EDD',
    3: '#FFBC6EAA',
    4: '#FFBC6E77',
    5: '#FFBC6E33',
    6: '#FFBC6E00',
  },
  error: {
    0: '#B13D3D',
    1: '#E95050',
    2: '#E95050DD',
    3: '#E95050AA',
    4: '#E9505077',
    5: '#E9505033',
    6: '#E9505000',
  },
};

export const palette = {
  text: {
    primary: egPalette.text[1],
    secondary: egPalette.text[2],
  },
  primary: {
    main: egPalette.info[1],
    dark: egPalette.info[0],
  },
  secondary: {
    main: egPalette.error[1],
    dark: egPalette.error[0],
  },
  action: {
    disabledBackground: '#DCDCDC',
  },
};

export const egShadows = [
  '0 3px 16px 0 rgba(10, 75, 109, 0.08)',
  '0 6px 26px 0 #efeff7',
  '0px 0px 30px 1px #0000001f',
];

const fontFamily = [
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
