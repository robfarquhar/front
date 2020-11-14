import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import FilmList from '../components/FilmList';
import { device } from '../utils/device';
import Video from '../components/Video';

const IndexStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 8rem;

  @media ${device.mobileL} {
    padding-bottom: 0rem;
  }

  .blurb {
    max-width: 900px;
    margin: 2em 0;
    font-size: 2.3rem;
    @media ${device.mobileL} {
      margin: 1em 1em;
      font-size: 1.6rem;
    }
  }
  h2 {
    text-align: center;
    font-size: 2.1em;
    margin: 4rem 0 0.6em;
  }
  @media ${device.mobileL} {
    h2 {
      font-size: 1.6em;
      margin: 1.6rem 0 0em;
    }
  }
`;

export default function HomePage({ data }) {
  const films = data.films.nodes;
  const { sanitySiteData } = data;

  return (
    <>
      <Video />
      <IndexStyles>
        <p className="blurb">{sanitySiteData.blurb}</p>
        <h2>Selected work</h2>
        <FilmList sanitySiteData={sanitySiteData} />
      </IndexStyles>
    </>
  );
}

export const Query = graphql`
  query IndexQuery {
    films: allSanityFilm {
      nodes {
        name
        duration
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          _key
          _type
          current
        }
      }
    }
    sanitySiteData {
      blurb
      _rawFeatured1Text
      _rawFeatured2Text
      _rawFeatured3Text
      featured1Link
      featured2Link
      featured3Link
      featured {
        name
        id
        slug {
          current
        }
        image {
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
      }
    }
  }
`;
