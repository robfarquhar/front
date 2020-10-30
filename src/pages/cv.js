import React from 'react';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SanityBlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';

// make media queries on font sizing for mobile

const JobDivStyles = styled.div`
  border-radius: 14px;
  box-shadow: 0 30px 50px 0 rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  background: white;
  p {
    margin-block-end: 0;
  }
`;
const CompanyDiv = styled.div`
  h2 {
    font-size: 1.1em;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const FilmTitleDiv = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 3rem; */

  span:first-child {
    color: var(--red);
    font-size: 10px;
    line-height: 1em;
    margin-right: 1em;
    margin-bottom: 0.4em;
  }
`;
const JobRoleStyles = styled.p`
  font-family: 'Syne';
  font-size: 1.2rem;
  /* font-family: 'Epilogue'; */
  font-weight: 100;
  text-transform: uppercase;
  span {
    background: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.8);
    padding: 0.1rem 1rem;
    border-radius: 50px;
    border: dotted 1px rgba(255, 255, 255, 0.3);
    box-shadow: 0px 3px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;
const ContactStyles = styled.p`
  font-family: 'Syne';
  font-size: 1.2rem;
  /* font-family: 'Epilogue'; */
  font-weight: 100;
  /* text-transform: uppercase; */
  span {
    background: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.8);
    padding: 0.1rem 1rem;
    border-radius: 50px;
    border: dotted 1px rgba(255, 255, 255, 0.3);
    box-shadow: 0px 3px 4px 0 rgba(0, 0, 0, 0.1);
    margin: 0 0.8rem;
  }
`;

export default function CVPage({ data }) {
  return (
    <>
      <BackgroundImage
        Tag="section"
        style={{
          minHeight: '600px',
          maxHeight: '90vh',
        }}
        fluid={data.sanityCvPage.image.asset.fluid}
      />
      <div style={{ textAlign: 'center', margin: '4rem 0 2rem' }}>
        <h1>Rob Farquhar</h1>
        <h3>Series Director / Producer</h3>
        <ContactStyles>
          <span>
            <a href="mailto:robfarquhar@me.com">robfarquhar@me.com</a>
          </span>
          <span>
            {' '}
            <a href="tel:00447590561867">(+44)7590 561867</a>
          </span>
        </ContactStyles>
        <h2 style={{ marginTop: '2em' }}>Career Credits</h2>
      </div>
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        {data.sanityCvPage.cvEntries.map((item, index) => (
          <JobDivStyles key={index}>
            <CompanyDiv>
              {/* <h2>{item.jobName}</h2>{' '} */}
              {/* {item.additionalInfo ? <span>{item.additionalInfo}</span> : ''} */}
            </CompanyDiv>
            {/* {item.additionalInfo ? <p>{item.additionalInfo}</p> : ''} */}
            {/* {item.itemName.map((x, i) => ( */}
            {/* <div key={i}> */}
            <FilmTitleDiv>
              <span>⬤</span> <h4>{item.jobName}</h4>
              {/* <span>{x.filmName}</span> */}
            </FilmTitleDiv>
            {item.additionalInfo ? (
              <span style={{ fontSize: '1.5rem' }}>{item.additionalInfo}</span>
            ) : (
              ''
            )}
            {/* <JobRoleStyles>
                  <span>{x.role}</span>
                </JobRoleStyles> */}
            <div
              style={{
                fontFamily: 'Syne',
                fontSize: '1.3rem',
              }}
            >
              {item._rawExtraText ? (
                <SanityBlockContent
                  blocks={item._rawExtraText}
                  projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                  dataset={process.env.GATSBY_SANITY_DATASET}
                />
              ) : (
                ''
              )}
            </div>
            {/* </div> */}
            {/* ))} */}
          </JobDivStyles>
        ))}

        {/*  */}
      </div>
    </>
  );
}
// ◯ ⬤ ◌
export const query = graphql`
  query cvQuery {
    sanityCvPage {
      image {
        asset {
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
      cvEntries {
        id
        jobName
        additionalInfo
        _rawExtraText
      }
    }
  }
`;
