import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import _kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import { BiChevronDownCircle as Chevron } from 'react-icons/bi';
import { CSSTransition } from 'react-transition-group';
import useComponentVisible from '../../utils/useComponentVisible';
import { device } from '../../utils/device';

const AccordionStyles = styled.div`
  position: relative;
  color: #f1f1f1;
  z-index: 99999;
  &:focus {
    /* outline: none; */
  }
  .Accordion {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  .Accordion--item {
    position: relative;
    cursor: pointer;
  }
  .Accordion--item:hover {
    color: var(--red);
  }
  .Accordion--item:focus {
    outline: none;
  }
  .Accordion--item h2 {
    cursor: pointer;
    display: block;
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
    pointer-events: none;
  }

  .Accordion--item .chevron {
    margin-left: 1rem;
    margin-top: 3px;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    color: #f1f1f1 !important;
    transition: ease all 0.3s;
  }

  .Accordion--item.active .chevron {
    transform: rotate(-180deg);
  }

  .Accordion--item .description {
    opacity: 0;
    transition: ease all 0.3s;
    max-height: 0;
    pointer-events: none;
    outline: none;
    a {
      font-size: 1.8rem;
    }
  }
  .Accordion--item.active .description {
    padding: 0.6rem 0.4em 0.6rem;
    pointer-events: all;
    opacity: 1;
    max-height: 50rem;
  }
  .flex {
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  a {
    color: #f1f1f1;
  }

  // CSS transition
  .list-transition-enter {
    opacity: 0;
    transform: translateY(-9px) scale(0.85);
  }
  .list-transition-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .list-transition-exit {
    opacity: 1;
  }
  .list-transition-exit-active {
    opacity: 0;
    transform: translateY(-9px) scale(0.8);
    transition: opacity 200ms, transform 300ms;
  }
`;

function Accordion({ title, items }) {
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
    <AccordionStyles>
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
