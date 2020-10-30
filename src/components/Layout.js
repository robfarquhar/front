import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Sidebar from './MobileMenu/Sidebar';
import useWindowSize from '../utils/useWindowSize';

const SiteBorderStyles = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1100px) {
  }
`;

const ContentStyles = styled.div`
  background: white;
`;

export default function Layout({ path, children }) {
  const { width } = useWindowSize();
  return (
    <>
      <GlobalStyles id="outer-container" />
      <Typography />
      {width <= 768 ? (
        <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
      ) : (
        ''
      )}
      <SiteBorderStyles id="page-wrap">
        <ContentStyles>
          <Nav path={path} width={width} />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
