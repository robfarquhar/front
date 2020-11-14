import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import { useScrollPosition } from '../utils/useScrollPosition';
import Accordion from './Accordion';
import { device } from '../utils/device';
import useIsClient from '../utils/useIsClient';

const NavStyles = styled.nav`
  top: ${(props) => (props.path === '/' ? '0' : '')};
  margin-bottom: ${(props) => (props.path === '/' ? '0' : '2rem')};
  height: 3.5rem;
  padding-top: 2rem;
  z-index: 999;
  position: relative;
  width: 100%;
  color: ${(props) => (props.isNavWhite ? `var(--black)` : 'white')};

  .nav-container {
    max-width: 1500px;
    position: ${(props) => (props.path === '/' ? 'fixed' : 'static')};
    width: 100%;
    padding: 2rem 0 2rem 0;
    margin-top: -2rem;
    box-shadow: ${(props) =>
      props.isNavWhite ||
      props.path === '/commercials/' ||
      props.path === '/cv/'
        ? `5px 10px 40px 0 rgba(0, 0, 0, 0.2)`
        : ''};
    background: ${(props) => (props.isNavWhite ? `white` : 'transparent')};
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 1.1fr 0.7fr;
    grid-gap: 2rem;
    @media ${device.mobileL} {
      display: flex;
      margin-left: 1em;
    }
  }
  li {
    font-size: 1.5rem;
    z-index: 999;
  }
  a {
    color: ${(props) =>
      props.path === '/'
        ? props.isNavWhite
          ? `var(--black)`
          : 'white'
        : 'var(--black)'};
    font-size: 2.5rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

const TitleLi = styled.li`
  margin-top: -0.5rem;
  display: flex;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  p {
    text-align: start;
    margin: 0;
    font-size: 1.5rem;
  }
`;

export default function Nav({ path, width }) {
  const { isClient, key } = useIsClient();
  const [isNavWhite, setIsNavWhite] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y > -200;

      // const isShow = currPos.y > prevPos.y;
      // const isVisible = currPos.y > prevPos.y;
      // if (JSON.stringify(isNavWhite) !== JSON.stringify(isNavWhite)) return;

      setIsNavWhite(!isVisible);
    },
    [isNavWhite]
  );

  if (!isClient) return null;

  return (
    <StaticQuery
      query={graphql`
        query NavQuery {
          films: allSanityFilmOrder {
            nodes {
              menuEntries {
                name
                slug {
                  current
                }
                id
              }
            }
          }
        }
      `}
      render={(data) => (
        <div>
          {width >= 768 ? (
            <>
              <NavStyles path={path} isNavWhite={isNavWhite} key={key}>
                <div className="nav-container">
                  <ul>
                    <TitleLi>
                      <div>
                        <Link to="/">
                          Rob Farquhar <p>DIRECTOR</p>
                        </Link>
                      </div>
                    </TitleLi>

                    <>
                      <li>
                        <Accordion
                          title="Documentaries"
                          items={data.films.nodes[0].menuEntries}
                          path={path}
                          isNavWhite={isNavWhite}
                          key={key}
                          width={width}
                        />
                      </li>
                      <li>
                        <Link to="/commercials/">Commercials</Link>
                      </li>
                      <li>
                        <Link to="/cv/">CV</Link>
                      </li>
                    </>
                  </ul>
                </div>
              </NavStyles>
            </>
          ) : (
            <NavStyles>
              <ul>
                <li
                  style={{
                    lineHeight: '1.3',
                    marginTop: '-0.8rem',
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      color: `${path === '/' ? 'white' : 'black'}`,
                    }}
                  >
                    Rob Farquhar{' '}
                    <p
                      style={{
                        margin: '0 0 0 -8.6rem',
                        fontSize: '1.5rem',
                        color: `${path === '/' ? 'white' : 'black'}`,
                      }}
                    >
                      DIRECTOR
                    </p>
                  </Link>
                </li>
              </ul>
            </NavStyles>
          )}
        </div>
      )}
    />
  );
}

// items={data.films.nodes[0].menuEntries.filter(
//  (film) => film.category === 'documentary'
// )}

// @media ${device.mobileL} {
//   color: white;
// }

// {/* <Accordion
//                         title="Commercials"
//                         items={data.films.nodes[0].menuEntries.filter(
//                           (film) => film.category === 'commercial'
//                         )}
//                         path={path}
//                         isNavWhite={isNavWhite}
//                         key={key}
//                         width={width}
//                       /> */}
