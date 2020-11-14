import React, { useState } from 'react';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SanityBlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import FsLightbox from 'fslightbox-react';
import ReactPlayer from 'react-player';
import { device } from '../utils/device';
import useWindowSize from '../utils/useWindowSize';

const FilmGridStyles = styled.div`
  display: grid;
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
    @media ${device.mobileL} {
      --rows: 5px auto 1fr;
    }
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  @media ${device.mobileL} {
    grid-row: span 1;
  }
  grid-gap: 1rem;
  h3 {
    text-align: center;
    @media ${device.tablet} {
      display: none;
      font-size: 1em;
    }
  }
  h3,
  p {
    margin-top: 1rem;
  }

  .fslightbox-source-inner {
    transition: opacity 2.3s;
    opacity: ${(props) => (props.filmVisible ? 1 : 0)};
  }

  .fslightbox-fade-in-strong {
    animation: none;
  }
  .fslightbox-source {
    opacity: 1;
    transition: none;
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
  .player.active {
  }
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  min-height: 300px;
  .bg-img:hover {
    transition: all 2s;
    transform: scale(1.2);
    .mob-vid-text {
      transition: opacity 0.6s;
      opacity: 0;
    }
    .filter {
      opacity: 1;
      transition: all 0.8s;
    }
  }
  .filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    opacity: 0;
    pointer-events: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.8s;
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
  transition: color 1s, filter 1.4s;
  &:hover {
    color: rgba(255, 255, 255, 0.726);
    filter: drop-shadow(9px 6px 6px rgba(0, 0, 0, 0.99));
    p {
      transition: opacity 0.8s;
      opacity: 1;
    }
  }
  svg {
    height: 50%;
    width: 50%;
    stroke: rgba(255, 255, 255, 0.45);
    stroke-width: 0.1;
  }
  p {
    transition: opacity 0.8s;
    color: white;
    opacity: 0;
    max-width: 250px;
  }
`;
const TextStyles = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: rgba(255, 255, 255, 1);
  transition: color 1s, filter 1.4s;
  &:hover {
    color: rgba(255, 255, 255, 0.726);
    p {
      transition: opacity 0.8s;
      opacity: 1;
    }
  }
  p {
    transition: opacity 0.8s;
    color: white;
    opacity: 0;
    max-width: 250px;
  }
`;

const BlockStyles = styled.div`
  font-size: 1.6rem;
  line-height: 1.2;
  p {
    margin: 1rem 0;
  }
  @media ${device.mobileL} {
    font-size: 1.3rem;
    p {
      margin: 0.6rem 0;
    }
  }
`;

function SingleFilm({ filmNumber, film, sanitySiteData }) {
  const [toggler, setToggler] = useState(false);
  const [filmVisible, setFilmVisible] = useState(false);

  const { width } = useWindowSize();

  return (
    <FilmStyles filmVisible={filmVisible}>
      <Link style={{ alignSelf: 'center' }} to={`/film/${film.slug.current}`}>
        <h3>
          <span className="mark">{film.name}</span>
        </h3>
      </Link>
      <FsLightbox
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        toggler={toggler}
        sources={[
          <PlayerWrap>
            <ReactPlayer
              controls
              className={`player ${filmVisible ? 'active' : ''}`}
              width="100%"
              height="100%"
              onReady={() => {
                setFilmVisible(true);
              }}
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
        onClose={() => setFilmVisible(false)}
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
          <div className="filter">
            {filmNumber === 1 ? (
              ''
            ) : (
              <TextStyles>
                <p>Watch Trailer</p>
              </TextStyles>
            )}
          </div>
          {width <= 768 ? (
            <p
              className="mob-vid-text"
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '5px',
                color: 'white',
                margin: '0',
                textAlign: 'left',
                maxWidth: '90%',
                transition: 'opacity 0.6s',
              }}
            >
              {film.name}
            </p>
          ) : (
            ''
          )}
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

/*

            <PlayStyles>
              <PlayIcon />
            </PlayStyles>
            <TextStyles>
              <p>{film.name} Trailer</p>
            </TextStyles> 
            
              <PlayStyles>
                <PlayIcon />
              </PlayStyles> 

            // url("https://i.vimeocdn.com/video/811564050.webp?mw=1700&mh=966&q=70")
// maybe this for a section? rgb(239, 247, 248)
// slight border radius on featured films?
*/
