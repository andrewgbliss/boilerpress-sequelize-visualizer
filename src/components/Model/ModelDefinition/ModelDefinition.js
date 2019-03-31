import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModelsContext from 'context/Models/Context';
import ColumnDefinition from './ColumnDefinition';

const styles = theme => ({
  columns: {
    maxHeight: 350,
    overflow: 'auto',
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  spacing: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
});

function ModelName() {
  const { currentModel, setModelName } = useContext(ModelsContext);
  return (
    <>
      <Typography>Model Name</Typography>
      <TextField
        value={currentModel.name}
        onChange={e => setModelName(e.target.value)}
        margin="normal"
        fullWidth
      />
    </>
  );
}

function Columns() {
  const { currentModel } = useContext(ModelsContext);
  return (
    <>
      <Typography>Columns</Typography>
      {currentModel.columns.map((column, key) => {
        return (
          <div key={key}>
            <ColumnDefinition key={key} index={key} column={column} />
            <Divider />
          </div>
        );
      })}
    </>
  );
}

function ModelDefinition({ classes }) {
  const { addNewColumn } = useContext(ModelsContext);
  return (
    <>
      <div className={classes.spacing}>
        <ModelName />
      </div>
      <div className={classes.columns}>
        <Columns />
      </div>
      <Button variant="outlined" onClick={addNewColumn}>
        Add New Column
      </Button>
    </>
  );
}

ModelDefinition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelDefinition);
