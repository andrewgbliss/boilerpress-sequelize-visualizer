import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
});

function Visualization({ classes }) {
  return <Typography>Visualize</Typography>;
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Visualization);
