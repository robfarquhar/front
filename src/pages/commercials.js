import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
// import BackgroundImage from 'gatsby-background-image';
// import SanityBlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { device } from '../utils/device';

// const ContactStyles = styled.p``;
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  background: black;
  transition: opacity 1.4s;
  opacity: 0;
`;
const CommercialsWrapper = styled.div`
  min-height: calc(100vh - 9em);
  text-align: center;
  transition-delay: 1s;
  transition: opacity 1.8s;

  h2 {
    margin: 7rem 0 4rem;
    @media ${device.mobileL} {
      margin: 2rem 0 2rem;
      font-size: 0.9em;
    }
  }
  p {
    @media ${device.mobileL} {
      margin: 2rem 0 2rem;
      font-size: 1.4rem;
    }
  }
  .video-wrap {
    width: calc(100% - 1em);
    margin: 0 0.5em 0;
    /* max-width: 1200px; */

    @media ${device.mobileL} {
      width: 100%;
      margin: 0;
    }

    display: grid;
    grid-template-columns: 1fr 1fr;
    @media ${device.mobileL} {
      grid-template-columns: 1fr;
    }
    grid-gap: 1em;
    grid-auto-rows: auto;
    grid-auto-flow: dense;
    justify-content: center;
    align-items: center;

    /* transition: opacity 0.8s; */
    /* opacity: 0; */
  }
  .last-video-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 1em auto 0;
    max-width: 1200px;

    /* transition: opacity 0.8s; */
    /* opacity: 0; */
  }
  .two-col {
    width: 100%;
    /* margin: 1rem; */
  }
  .one-col {
    width: 50%;
    @media ${device.mobileL} {
      width: 100%;
    }
    /* margin: 1rem; */
  }
`;

export default function CommercialsPage({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setPageIsLoaded] = useState(false);
  useEffect(() => {
    setPageIsLoaded(true);
  }, []);

  const commLength = data.sanityCommercialOrder.commercialEntries.length;

  return (
    <CommercialsWrapper>
      <h2>Commercials & Branded Content</h2>

      <div className="video-wrap">
        {data.sanityCommercialOrder.commercialEntries.map((x, i) => {
          if (
            commLength % 2 !== 1 ||
            (commLength % 2 === 1 && i !== commLength - 1)
          ) {
            return (
              <div className="two-col" key={x.id}>
                <PlayerWrapper style={{ opacity: isPageLoaded ? `1` : `0` }}>
                  <ReactPlayer
                    controls
                    url={x.url}
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      opacity: isLoaded ? `1` : `0`,
                      transition: 'opacity 1.8s',
                    }}
                    onReady={() => setIsLoaded(true)}
                  />
                </PlayerWrapper>
                <p>{x.name}</p>
              </div>
            );
          }
        })}
      </div>

      <div className="last-video-wrap">
        {data.sanityCommercialOrder.commercialEntries.map((x, i) => {
          if (commLength % 2 === 1 && i === commLength - 1) {
            return (
              <div className="one-col" key={x.id}>
                <PlayerWrapper style={{ opacity: isPageLoaded ? `1` : `0` }}>
                  <ReactPlayer
                    controls
                    url={x.url}
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      opacity: isLoaded ? `1` : `0`,
                      transition: 'opacity 1.8s',
                    }}
                  />
                </PlayerWrapper>
                <p>{x.name}</p>
              </div>
            );
          }
        })}
      </div>
    </CommercialsWrapper>
  );
}

export const query = graphql`
  query commercialQuery {
    sanityCommercialOrder {
      commercialEntries {
        name
        url
        id
      }
    }
  }
`;

// ◯ ⬤ ◌
// query MyQuery {
//   sanityCommercialOrder {
//     commercialEntries {
//       name
//       url
//       id
//     }
//   }
// }

// query commercialQuery {
//   sanityCommercial {
//     _rawContent
//     image {
//       asset {
//         fluid(maxWidth: 400) {
//           ...GatsbySanityImageFluid
//         }
//       }
//     }
//   }
// }

// return (
//   <div className="two-col" key={x.id}>
//     {i !== commLength - 1 ? (
//       <div>
//         <PlayerWrapper>
//           <ReactPlayer
//             controls
//             url={x.url}
//             width="100%"
//             height="100%"
//             style={{ position: 'absolute', top: '0', left: '0' }}
//           />
//         </PlayerWrapper>
//         <p>{x.name}</p>
//       </div>
//     ) : (
//       <div className="one-col">
//         <PlayerWrapper>
//           <ReactPlayer
//             controls
//             url={x.url}
//             width="100%"
//             height="100%"
//             style={{ position: 'absolute', top: '0', left: '0' }}
//           />
//         </PlayerWrapper>
//         <p> FULL WIDTH {x.name}</p>
//       </div>
//     )}
//   </div>
// );

// const serializers = {
//   types: {
//     videoURL: ({ node }) => {
//       const { url } = node;
//       return (
//         <PlayerWrapper>
//           <ReactPlayer
//             controls
//             url={url}
//             width="100%"
//             height="100%"
//             style={{ position: 'absolute', top: '0', left: '0' }}
//           />
//           ;
//         </PlayerWrapper>
//       );
//     },
//   },
// };

// {/* {(i + 1) % 2 === 0 ? <br /> : ``}
// <BackgroundImage
// Tag="section"
// style={{
//   minHeight: '600px',
//   maxHeight: '90vh',
// }}
// fluid={data.sanityCommercial.image.asset.fluid}
//      />
// <SanityBlockContent
//            blocks={data.sanityCommercial._rawContent}
//            projectId={process.env.GATSBY_SANITY_PROJECT_ID}
//            dataset={process.env.GATSBY_SANITY_DATASET}
//            serializers={serializers}
//          />
