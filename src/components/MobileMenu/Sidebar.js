import React, { useContext } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { slide as Menu } from 'react-burger-menu';
import { MyContext } from '../MenuProvider';

import Accordion from './MobileAccordion';
import './Sidebar.css';

const Sidebar = () => {
  const ctx = useContext(MyContext);
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
            }
          }
        }
      }
    `
  );

  return (
    <Menu
      width="76vw"
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    >
      <Link className="menu-item" to="/" onClick={ctx.toggleMenu}>
        Home
      </Link>
      <div style={{ position: 'relative' }}>
        <Accordion
          className="menu-item"
          title="Documentaries"
          items={films.nodes[0].menuEntries}
        />
      </div>
      <Link className="menu-item" to="/commercials" onClick={ctx.toggleMenu}>
        Commercials
      </Link>
      <Link className="menu-item" to="/cv" onClick={ctx.toggleMenu}>
        CV
      </Link>
    </Menu>
  );
};
export default Sidebar;

// <div style={{ position: 'relative', paddingBottom: '0.4rem' }}>
//         <Accordion
//           className="menu-item"
//           title="Commercial"
//           items={films.nodes[0].menuEntries.filter(
//             (film) => film.category === 'commercial'
//           )}
//         />
//       </div>
