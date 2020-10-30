// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: `RobFarquhar.com`,
    siteUrl: 'https://www.robfarquhar.com',
    description: 'RobFarquhar.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sass',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Syne`,
              variants: [`400`],
            },
            {
              family: `Rubik`,
              variants: [`300`, `400`],
            },
          ],
        },
      },
    },
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '4mmbw7b5',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
