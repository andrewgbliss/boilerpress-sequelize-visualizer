import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Grid from 'components/Grid/Grid';
import defaultTheme from 'themes/default';
import darkTheme from 'themes/dark';
import AppContext from 'context/App/Context';
import ModelsProvider from 'context/Models/Provider';
import LeftDrawer from 'components/Drawer/LeftDrawer';
import RightDrawer from 'components/Drawer/RightDrawer';

function App() {
  const context = useContext(AppContext);
  const theme = context.darkMode ? darkTheme : defaultTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RightDrawer />
      <ModelsProvider>
        <LeftDrawer />
        <Grid />
      </ModelsProvider>
    </MuiThemeProvider>
  );
}

export default App;
