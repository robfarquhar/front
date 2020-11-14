import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import _kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import { BiChevronDownCircle as Chevron } from 'react-icons/bi';
import { CSSTransition } from 'react-transition-group';
import useComponentVisible from '../utils/useComponentVisible';
import { device } from '../utils/device';

const AccordionStyles = styled.div`
  position: relative;

  z-index: 99999;
  .Accordion {
    position: absolute;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  .Accordion--item {
    position: relative;
    background: transparent;
    background: ${(props) =>
      props.path === '/'
        ? props.isNavWhite
          ? `white`
          : 'transparent'
        : 'white'};

    border-radius: 1rem;
    cursor: pointer;
  }
  .Accordion--item:hover {
    color: var(--red);
  }
  .Accordion--item:focus {
    outline: none;
  }
  .Accordion--item h2 {
    color: ${(props) =>
      props.path === '/'
        ? props.isNavWhite
          ? `var(--black)`
          : 'white'
        : 'var(--black)'};

    cursor: pointer;
    display: block;
    margin: 0;
    font-size: 2.5rem;
    font-weight: normal;
    pointer-events: none;
    margin-bottom: 0.5em;
  }
  .Accordion--item h2:hover {
    color: var(--red) !important;
  }
  .Accordion--item .chevron {
    margin-left: 1rem;
    margin-top: 3px;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    color: ${(props) =>
      props.path === '/'
        ? props.isNavWhite
          ? `var(--black)`
          : 'white'
        : 'var(--black)'};
    transition: ease color 0.3s, transform 0.3s;
  }

  .Accordion--item.active .chevron {
    transform: rotate(-180deg);
  }

  .Accordion--item .description {
    opacity: 0;
    transition: ease color 0.3s;
    max-height: 0;
    pointer-events: none;
    outline: none;
    a {
      font-size: 1.8rem;
    }

    color: ${(props) => (props.isNavWhite ? `var(--black)` : 'white')};
    text-shadow: ${(props) =>
      props.path !== '/'
        ? 'none'
        : props.isNavWhite
        ? ''
        : '0px 0px 3px rgba(0, 0, 0, 0.6)'};
  }
  .Accordion--item.active .description {
    padding: 0.8rem 0.5em 0.8rem;
    pointer-events: all;
    opacity: 1;
    max-height: 50rem;

    @media ${device.tablet} {
      ${(props) => (props.path === '/' ? `padding: 0` : '')}
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    pointer-events: none;
    /* width: 300px; */
  }
  .flex h2:hover {
    color: var(--red) !important;
  }

  // CSS transition
  .list-transition-enter {
    opacity: 0;
    transform: translateY(-9px) scale(0.9, 0.8);
  }
  .list-transition-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 1000ms, transform 200ms;
  }
  .list-transition-exit {
    opacity: 1;
  }
  .list-transition-exit-active {
    opacity: 0;
    transform: translateY(-9px) scale(0.8);
    transition: opacity 400ms, transform 300ms;
  }
`;

function Accordion({ title, items, path, isNavWhite, width }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13 && !ev.target.classList.contains('active')) {
      // enter to open
      // toggleAccordion(ev);
    } else if (ev.keyCode === 27 && ev.target.classList.contains('active')) {
      // escape to close
      // toggleAccordion(ev);
    }
  };

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  useEffect(() => {
    if (!isComponentVisible) {
      setIsOpen(false);
    }
    return () => {
      // cleanup;
    };
  }, [isComponentVisible]);

  return (
    <AccordionStyles path={path} isNavWhite={isNavWhite} width={width}>
      <div ref={ref} className={`Accordion `}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Toggle Accordion"
          className={`Accordion--item ${isOpen ? 'active' : ''}`}
          onClick={() => {
            setIsComponentVisible(true);
            setIsOpen(!isOpen);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          <div className="flex">
            <h2>{title}</h2>
            <Chevron className="chevron" />
          </div>

          {!!items &&
            items.map((item, index) => (
              <div key={index}>
                <CSSTransition
                  in={isComponentVisible && isOpen}
                  timeout={400}
                  classNames="list-transition"
                  unmountOnExit
                  appear
                >
                  <div key={index} className="description">
                    {item && (
                      <Link
                        to={`/film/${item.slug.current}`}
                        className="button"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                </CSSTransition>
              </div>
            ))}
        </div>
      </div>
    </AccordionStyles>
  );
}

export default Accordion;
