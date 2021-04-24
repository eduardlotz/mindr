// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    //basic colors
    black: string;
    grey: string;
    lightgrey: string;
    white: string;

    //container colors
    mainBg: string;
    mainSubtleText: string;
    mainContrastText: string;
    container: string;
    containerContrast: string;

    //accent colors
    primary: string;
    primaryContrast: string;
    primaryMuted: string;
    primaryFaded: string;
    primaryLight: string;

    //muted colors
    mutedBg: string;
    mutedContrast: string;

    // state colors
    error: string;
    errorDark: string;

    //shadows
    btnShadow: string;
  }
}
