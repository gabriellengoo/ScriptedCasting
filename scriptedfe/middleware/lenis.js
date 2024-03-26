// lenis.js
import Lenis from '@studio-freight/lenis';

export default function ({ route }) {
  // Define routes where you want the component to run
  const allowedRoutes = ['/', '/work/:slug'];

  // Define routes where you do not want the component to run
  const notAllowedRoutes = ['/works'];

  // Check if the current route is in the allowed routes and not in the not allowed routes
  if (allowedRoutes.includes(route.path) && !notAllowedRoutes.includes(route.path)) {
    const lenis = new Lenis();
    lenis.on('scroll', (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}
