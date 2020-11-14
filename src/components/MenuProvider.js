import React, { useState } from 'react';

// make a new context
export const MyContext = React.createContext();

// create the provider
export const MenuProvider = ({ children }) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
