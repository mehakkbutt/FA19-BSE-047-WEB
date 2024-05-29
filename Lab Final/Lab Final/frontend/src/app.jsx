/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SnackbarProvider } from 'notistack';

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
