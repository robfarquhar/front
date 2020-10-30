import React, { useState } from 'react';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SanityBlockContent from '@sanity/block-content-to-react';
import { BsPlayFill as PlayIcon } from 'react-icons/bs';
// import Img from 'gatsby-image';
import styled from 'styled-components';
import FsLightbox from 'fslightbox-react';
import ReactPlayer from 'react-player';
import { device } from '../utils/device';

const FilmGridStyles = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3.5rem;
  grid-auto-rows: auto auto 500px;
  /* margin: 3rem 2rem 2rem 2rem; */
  width: 96%;
`;

const FilmStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the FilmStyles div, but from the  FilmGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: 60px auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h3 {
    text-align: center;
    @media ${device.tablet} {
      font-size: 1em;
    }
    @media ${device.mobileL} {
      font-size: 1.3em;
    }
    @media ${device.mobileS} {
      font-size: 1.1em;
    }
  }
  h3,
  p {
    margin-top: 1rem;
  }
`;
const PlayerWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-top: 56.25%;

  .player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  min-height: 300px;
  /* transition: transform 2s; */
  .bg-img:hover {
    transition: all 2s;
    transform: scale(1.2);
    filter: brightness(0.6);
  }
`;

const PlayStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  color: rgba(255, 255, 255, 0.1);
  /* filter: drop-shadow(30px 10px 4px #4444dd); */
  transition: color 1s, filter 1.4s;
  &:hover {
    color: rgba(255, 255, 255, 0.726);
    filter: drop-shadow(9px 6px 6px rgba(0, 0, 0, 0.99));
  }
  svg {
    height: 50%;
    width: 50%;
    stroke: rgba(255, 255, 255, 0.45);
    stroke-width: 0.1;
  }
`;
const BlockStyles = styled.div`
  font-size: 1.6rem;
  line-height: 1.2;
  p {
    margin: 1rem 0;
  }
`;

function SingleFilm({ filmNumber, film, sanitySiteData }) {
  const [toggler, setToggler] = useState(false);
  return (
    <FilmStyles>
      <Link style={{ alignSelf: 'center' }} to={`/film/${film.slug.current}`}>
        <h3>
          <span className="mark">{film.name}</span>
        </h3>
      </Link>
      <FsLightbox
        style={{
          background: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        toggler={toggler}
        sources={[
          <PlayerWrap>
            <ReactPlayer
              controls
              className="player"
              width="100%"
              height="100%"
              url={
                filmNumber === 0
                  ? sanitySiteData.featured1Link
                  : filmNumber === 1
                  ? sanitySiteData.featured2Link
                  : filmNumber === 2
                  ? sanitySiteData.featured3Link
                  : ''
              }
            />
          </PlayerWrap>,
        ]}
      />

      <ImageWrapper
        style={{ cursor: 'pointer', borderRadius: 'none' }}
        onClick={() => setToggler(!toggler)}
      >
        <BackgroundImage
          className="bg-img"
          Tag="section"
          style={{
            height: '300px',
            transition: 'all 2s',
            backgroundPosition: `${
              film.image.hotspot ? film.image.hotspot.x * 100 : 50
            }% ${film.image.hotspot ? film.image.hotspot.y * 100 : 50}%`,
          }}
          fluid={film.image.asset.fluid}
          alt={film.name}
        >
          <PlayStyles>
            <PlayIcon />
          </PlayStyles>
        </BackgroundImage>
      </ImageWrapper>

      {filmNumber === 0 ? (
        <FilmText blocks={sanitySiteData._rawFeatured1Text} />
      ) : filmNumber === 1 ? (
        <FilmText blocks={sanitySiteData._rawFeatured2Text} />
      ) : filmNumber === 2 ? (
        <FilmText blocks={sanitySiteData._rawFeatured3Text} />
      ) : (
        ''
      )}
    </FilmStyles>
  );
}
// url("https://i.vimeocdn.com/video/811564050.webp?mw=1700&mh=966&q=70")
// maybe this for a section? rgb(239, 247, 248)
// slight border radius on featured films?
function FilmText({ blocks }) {
  return (
    <BlockStyles>
      <SanityBlockContent
        blocks={blocks}
        projectId={process.env.GATSBY_SANITY_PROJECT_ID}
        dataset={process.env.GATSBY_SANITY_DATASET}
      />
    </BlockStyles>
  );
}

export default function FilmList({ sanitySiteData }) {
  // console.log(sanitySiteData);
  // console.log(sanitySiteData.featured);
  return (
    <FilmGridStyles>
      {sanitySiteData.featured.map((film, i) => (
        <SingleFilm
          key={film.id}
          filmNumber={i}
          film={film}
          sanitySiteData={sanitySiteData}
        />
      ))}
    </FilmGridStyles>
  );
}
