import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }
  html {
    background-image: url(${bg});
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px;
  }

  body {
    font-size: 2rem;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    /* background: var(--red); */
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
  }

  hr {
    border: 0;
    height: 8px;
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

`;

export default GlobalStyles;
