import React, { useContext } from 'react';
import AppContext from 'context/App/Context';
import Drawer from 'components/Drawer/Drawer';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

function RightDrawer() {
  const { darkMode, setDarkMode, mode, setMode } = useContext(AppContext);
  return (
    <Drawer icon={MenuIcon}>
      <Typography
        component="h5"
        variant="h6"
        align="center"
        style={{
          margin: 10,
        }}
      >
        Settings
      </Typography>
      <Divider />
      <FormControlLabel
        control={
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        }
        label="Dark Mode"
      />
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'visual'}
            onChange={() => setMode(mode === 'visual' ? 'edit' : 'visual')}
          />
        }
        label="Visualization Mode"
      />
    </Drawer>
  );
}

export default RightDrawer;
