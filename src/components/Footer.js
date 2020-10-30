import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  width: 100%;
  height: 3rem;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 3em;
  a {
    transition: color 0.2s;
  }
  a:hover {
    color: var(--red);
  }
`;
export default function Footer() {
  return (
    <FooterStyles>
      <p>
        Made by <a href="https://www.eyecandycode.com">EyeCandyCode</a> &copy;{' '}
        {new Date().getFullYear()}
      </p>
    </FooterStyles>
  );
}
