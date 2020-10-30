const size = {
  //   mobileS: '320px',
  mobileS: '375px',
  mobileM: '425px',
  mobileL: '768px',
  tablet: '1024px',
  laptop: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
  //   desktopL: `(max-width: ${size.desktop})`,
};
