import { createGlobalStyle } from 'styled-components';
// import font from '../assets/fonts/Biko_Bold.otf';

const Typography = createGlobalStyle`

  html {
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    /* text-decoration-color: var(--red); */
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
    text-decoration: none;
    transition: color 0.16s;
  }
  a:hover {
    color: var(--red);
  }
 
  mark, .mark {
    /* background: var(--yellow); */
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }
`;

export default Typography;
