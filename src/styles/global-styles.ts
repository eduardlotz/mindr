import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'HK Grotesk', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label, a {
    font-family: 'HK Grotesk', Helvetica, Arial, sans-serif;
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
