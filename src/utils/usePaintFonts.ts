import WebFont from 'webfontloader';
import { useEffect } from 'react';

export function usePaintFonts() {
  useEffect(() => {
    WebFont.load({
      classes: false,
      events: false,
      google: {
        families: ['DM Sans'],
      },
      typekit: {
        id: 'nah1hrx',
      },
    });
  }, []);
}
