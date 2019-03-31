import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppContext from 'context/App/Context';
import Model from 'components/Model/Model';
import Visualization from 'components/Visualization/Visualization';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
});

function MainGrid({ classes }) {
  const { mode } = useContext(AppContext);
  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item>
        {mode === 'edit' && <Model />}
        {mode === 'visual' && <Visualization />}
      </Grid>
    </Grid>
  );
}

MainGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainGrid);
