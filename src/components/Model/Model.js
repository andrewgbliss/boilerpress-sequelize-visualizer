import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ModelDefinition from './ModelDefinition/ModelDefinition';
import MigrationCode from './MigrationCode/MigrationCode';
import ModelCode from './ModelCode/ModelCode';
import ModelsContext from 'context/Models/Context';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 500,
    height: 600,
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    position: 'relative',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  tabsRoot: {},
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
});

function Model({ classes }) {
  const { currentModel, removeModel } = useContext(ModelsContext);
  if (!currentModel) {
    return <></>;
  }
  const [tab, setTab] = useState(0);
  return (
    <Paper className={classes.root}>
      <Typography component="span">
        <Tabs
          value={tab}
          onChange={(event, value) => setTab(value)}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            label={'Model Definition'}
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          />
          <Tab
            icon={<CodeIcon />}
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          />
        </Tabs>
      </Typography>
      <IconButton
        className={classes.close}
        color="inherit"
        aria-label="Settings"
        onClick={removeModel}
      >
        <Typography>
          <CloseIcon />
        </Typography>
      </IconButton>
      <Grid container>
        <Grid item xs={12}>
          {tab === 0 && <ModelDefinition />}
          {tab === 1 && (
            <>
              <MigrationCode />
              <ModelCode />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

Model.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Model);
