import React, { useState } from 'react';
import { Link, graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { slide as Menu } from 'react-burger-menu';
import Accordion from './MobileAccordion';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { films } = useStaticQuery(
    graphql`
      query MobileNavQuery {
        films: allSanityFilmOrder {
          nodes {
            menuEntries {
              name
              slug {
                current
              }
              id
              category
            }
          }
        }
      }
    `
  );
  return (
    <Menu width="76vw" isOpen={isOpen}>
      {/* <button onClick={() => setIsOpen(false)}>CHANGE</button> */}
      {/* {console.log(films)} */}
      {console.log(isOpen)}
      <Link className="menu-item" to="/">
        Home
      </Link>
      <div style={{ position: 'relative' }}>
        <Accordion
          className="menu-item"
          title="Documentaries"
          items={films.nodes[0].menuEntries.filter(
            (film) => film.category === 'documentary'
          )}
        />
      </div>
      <div style={{ position: 'relative', paddingBottom: '0.4rem' }}>
        <Accordion
          className="menu-item"
          title="Commercial"
          items={films.nodes[0].menuEntries.filter(
            (film) => film.category === 'commercial'
          )}
        />
      </div>
      <Link className="menu-item" to="/cv">
        CV
      </Link>
    </Menu>
  );
};
export default Sidebar;
