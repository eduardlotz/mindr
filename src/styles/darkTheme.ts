import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  black: '#111111',
  darkgrey: '#3d3d3d',
  grey: '#ABABAB',
  lightgrey: '#6F6F6F',
  white: '#ffffff',

  mainBg: '#131415',
  mainSubtleText: '#6F6F6F',
  mainContrastText: '#f5f5f5',
  container: '#1E1F21',
  containerContrast: '#ffffff',
  containerSubtleText: '#707174',

  primary: '#3A76E9',
  primaryContrast: '#ffffff',
  primaryMuted: '#dfd9f4',
  primaryFaded: '#1E232A',
  primaryLight: '#3C4759',

  mutedBg: '#2A3547',
  mutedContrast: '#465872',

  error: '#f32e2e',
  errorDark: '#f32e2e',

  btnShadow: `0px 2.0370371341705322px 2.6888887882232666px 0px
  rgba(37, 67, 115, 0.0196),
0px 9.629630088806152px 10.51111125946045px 0px rgba(37, 67, 115, 0.0304),
0px 25px 33px 0px rgba(37, 67, 115, 0.05)`,
};

export default theme;
