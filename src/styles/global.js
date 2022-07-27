import { createGlobalStyle } from 'styled-components';
import 'styled-components';

const Inter = require('../assets/fonts/Inter.ttf');
const Montserrat = require('../assets/fonts/Montserrat.ttf');
const Roboto = require('../assets/fonts/Roboto.ttf');

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${Inter}) format("ttf");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${Montserrat}) format("ttf");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format("ttf");
    font-weight: bold;
    font-style: normal;
  }
`;