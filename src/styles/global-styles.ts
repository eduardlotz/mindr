import { createGlobalStyle } from 'styled-components';
//basier bold
import BasierBoldWoff2 from '../assets/fonts/basier/bold.woff2';
import BasierBoldEot from '../assets/fonts/basier/bold.eot';
import BasierBoldWoff from '../assets/fonts/basier/bold.woff';
import BasierBoldTtf from '../assets/fonts/basier/bold.ttf';

//basier semi bold
import BasierSemiBoldWoff2 from '../assets/fonts/basier/semibold.woff2';
import BasierSemiBoldEot from '../assets/fonts/basier/semibold.eot';
import BasierSemiBoldWoff from '../assets/fonts/basier/semibold.woff';
import BasierSemiBoldTtf from '../assets/fonts/basier/semibold.ttf';

//basier regular
import BasierRegularWoff2 from '../assets/fonts/basier/regular.woff2';
import BasierRegularEot from '../assets/fonts/basier/regular.eot';
import BasierRegularWoff from '../assets/fonts/basier/regular.woff';
import BasierRegularTtf from '../assets/fonts/basier/regular.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Basier';
    font-style: normal;
    font-weight: bold;
    src: url(${BasierBoldEot});
    src: url(${BasierBoldWoff2}) format('woff2'),
         url(${BasierBoldWoff}) format('woff'),
         url(${BasierBoldTtf}) format('truetype');
  }
  
  @font-face {
    font-family: 'Basier';
    font-style: normal;
    font-weight: 600;
    src: url(${BasierSemiBoldEot});
    src: url(${BasierSemiBoldWoff2}) format('woff2'),
         url(${BasierSemiBoldWoff}) format('woff'),
         url(${BasierSemiBoldTtf}) format('truetype');
  }
  
  @font-face {
    font-family: 'Basier';
    font-style: normal;
    font-weight: normal;
    src: url(${BasierRegularEot});
    src: url(${BasierRegularWoff2}) format('woff2'),
         url(${BasierRegularWoff}) format('woff'),
         url(${BasierRegularTtf}) format('truetype');
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Basier Circle', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label, a {
    font-family: 'Basier Circle', Helvetica, Arial, sans-serif;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`;
