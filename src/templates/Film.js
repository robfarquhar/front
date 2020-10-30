import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';

import SanityBlockContent from '@sanity/block-content-to-react';
// import sanityClient from '@sanity/client';
// import sanityImageUrl from '@sanity/image-url';

import styled from 'styled-components';
import ReactPlayer from 'react-player';
// import { getFluidImage } from '../components/SanityHotspotImg.ts';
import { device } from '../utils/device';

const serializers = {
  types: {
    videoURL: ({ node }) => {
      const { url } = node;
      return (
        <PlayerWrapper>
          <ReactPlayer
            controls
            url={url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
          ;
        </PlayerWrapper>
      );
    },
  },
};

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`;
const BlockStyles = styled.div`
  margin: 1rem auto;
  padding: 0 1rem;
  max-width: 900px;
  /* width: 90vw; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text-wrap {
    text-align: center;
    margin: 4rem 0 2rem;
    @media ${device.mobileL} {
      margin: 2rem 0 2rem;
    }
  }
  h1 {
    @media ${device.mobileL} {
      font-size: 1.3em;
      margin-bottom: 1rem;
    }
  }
`;

export default function SingleFilmPage({ data }) {
  // const client = sanityClient({
  //   dataset: process.env.GATSBY_SANITY_DATASET,
  //   projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  //   useCdn: true,
  // });
  // const builder = sanityImageUrl(client);
  // // builder.image({ _id: "..." }).width(400).dpr(2).url()
  // function urlFor(source) {
  //   return builder.image(source);
  // }

  // x & y will be where the center of the hotspots are

  return (
    <>
      {/* <img
        src={urlFor(data.film.image._rawAsset._ref).height(600).url()}
        alt={data.film.name}
      /> */}
      {/* <Img
        fluid={getFluidImage(
          data.film.image._rawAsset,
          data.film.image.asset.fluid
        )}
      /> */}
      <BackgroundImage
        Tag="section"
        style={{
          height: '700px',
          maxHeight: '90vh',
          backgroundPosition: `${
            data.film.image.hotspot ? data.film.image.hotspot.x * 100 : 50
          }% ${
            data.film.image.hotspot ? data.film.image.hotspot.y * 100 : 50
          }%`,
        }}
        fluid={data.film.image.asset.fluid}
        alt={data.film.name}
      />
      <BlockStyles>
        <div className="text-wrap">
          <h1>{data.film.name}</h1>
          <h3>{data.film.year}</h3>
          <p>{data.film.duration}</p>
        </div>
        {data.film._rawDescription ? (
          <SanityBlockContent
            blocks={data.film._rawDescription}
            projectId={process.env.GATSBY_SANITY_PROJECT_ID}
            dataset={process.env.GATSBY_SANITY_DATASET}
            serializers={serializers}
          />
        ) : (
          ''
        )}
      </BlockStyles>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    film: sanityFilm(slug: { current: { eq: $slug } }) {
      name
      id
      _rawDescription
      duration
      year
      image {
        _key
        _type
        _rawAsset
        _rawHotspot
        _rawCrop
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      description {
        style
        list
        children {
          text
          marks
          _type
          _key
        }
      }
    }
  }
`;
