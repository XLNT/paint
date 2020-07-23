import { useEffect } from 'react';

export function usePaintFonts() {
  useEffect(() => {
    import('webfontloader').then((WebFont) =>
      WebFont.load({
        classes: false,
        events: false,
        google: {
          families: ['DM Sans'],
        },
        typekit: {
          id: 'nah1hrx',
        },
      }),
    );
  }, []);
}
