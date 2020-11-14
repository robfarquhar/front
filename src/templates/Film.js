import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
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
        <PlayerWrapper className="movie">
          <ReactPlayer
            controls
            url={url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
        </PlayerWrapper>
      );
    },
  },
};
const serializerNoText = {
  types: {
    videoURL: ({ node }) => {
      const { url } = node;
      return (
        <PlayerWrapper className="movie">
          <ReactPlayer
            controls
            url={url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
        </PlayerWrapper>
      );
    },
    block: ({ node }) => null,
  },
};

const StyledBackgroundImage = styled(BackgroundImage)`
  height: 550px;
  max-height: 90vh;
  @media ${device.mobileL} {
    height: 250px;
  }
`;
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  margin-bottom: 1em;
  background: black;
`;
const BlockStyles = styled.div`
  margin: 1rem auto;
  padding: 0 1rem;
  max-width: 1100px;
  /* width: 90vw; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text-wrap {
    text-align: center;
    margin: 2rem 0 0.5rem;
    @media ${device.mobileL} {
      margin: 1rem 0 1rem;
    }
    p {
      /* font-size: 1.6rem; */
      @media ${device.mobileL} {
        font-size: 1.4rem;
      }
    }
  }
  h1 {
    margin-bottom: -1.5rem;

    @media ${device.mobileL} {
      font-size: 2rem;
      margin-bottom: -1rem;
    }
  }
  /* now */
  .text-movie-wrapper {
    /* margin: 15px; */
    margin-top: 1em;
    @media ${device.mobileL} {
      margin-top: 0em;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    @media ${device.mobileL} {
      flex-direction: column;
    }
    flex-wrap: wrap;
    width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    width: 50%;
    @media ${device.mobileL} {
      /* flex-direction: row; */
      width: 100%;
    }
  }

  .text-column {
    height: auto;
    margin: 0 2em;
    word-wrap: break-word;
    font-size: 1.8rem;
    text-align: justify;

    .movie {
      /* THIS HIDES FILMS IN TEXT COLUMN  */
      display: none;
    }
    @media ${device.mobileL} {
      font-size: 1.4rem;
      margin: 0 1em;
    }
  }

  .movie-column {
    height: auto;
  }
`;
// video left

export default function SingleFilmPage({ data }) {
  const [isFilm, setIsFilm] = useState(true);

  useEffect(() => {
    // if no films, hide the film column
    if (
      data.film._rawDescription.filter((e) => e._type === 'videoURL').length ===
      0
    ) {
      setIsFilm();
    }
  }, []);

  return (
    <>
      <StyledBackgroundImage
        Tag="section"
        style={{
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
          <p>{data.film.duration}</p>
        </div>

        <div className="text-movie-wrapper">
          <div className="row">
            <div
              className="column"
              style={{ display: isFilm ? 'block' : 'none' }}
            >
              <div className="movie-column">
                {data.film._rawDescription ? (
                  <SanityBlockContent
                    blocks={data.film._rawDescription}
                    projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                    dataset={process.env.GATSBY_SANITY_DATASET}
                    serializers={serializerNoText}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="column">
              <div className="text-column">
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
              </div>
            </div>
          </div>
        </div>
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
