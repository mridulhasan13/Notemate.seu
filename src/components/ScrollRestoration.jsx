import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scrollPosition-${pathname}`, window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scrollPosition-${pathname}`);
    if (savedScroll) {
      // Allow slight delay for DOM rendering and fade animations
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
