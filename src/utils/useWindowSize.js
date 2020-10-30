import React, { useState, useEffect } from 'react';

// export default function useWindowSize() {
//   const isSSR = typeof window !== 'undefined';
//   const [windowSize, setWindowSize] = React.useState({
//     width: isSSR ? 1200 : window.innerWidth,
//     height: isSSR ? 800 : window.innerHeight,
//   });

export default function useWindowSize() {
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(!isBrowser ? 1200 : window.innerWidth);

  useEffect(() => {
    if (!isBrowser) return false;
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
}
