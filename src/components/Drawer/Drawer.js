import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  left: {
    position: 'fixed',
    top: 5,
    left: 5,
  },
  right: {
    position: 'fixed',
    top: 5,
    right: 5,
  },
  drawer: {
    width: 250,
    padding: theme.spacing.unit,
  },
});

const Drawer = ({ children, icon: MenuIcon, classes, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={align === 'left' ? classes.left : classes.right}>
      <IconButton
        color="inherit"
        aria-label="Settings"
        onClick={() => setOpen(true)}
      >
        <Typography>
          <MenuIcon fontSize="large" />
        </Typography>
      </IconButton>
      <SwipeableDrawer
        anchor={align}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className={classes.drawer}>{children}</div>
      </SwipeableDrawer>
    </div>
  );
};

Drawer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Drawer);
