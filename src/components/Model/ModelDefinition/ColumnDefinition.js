import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ModelsContext from 'context/Models/Context';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    background: theme.palette.background.default,
  },
  flex: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const dataTypes = [
  {
    label: 'SERIAL',
    value: 'SERIAL',
  },
  {
    label: 'STRING',
    value: 'STRING',
  },
  {
    label: 'INTEGER',
    value: 'INTEGER',
  },
  {
    label: 'FLOAT',
    value: 'FLOAT',
  },
  {
    label: 'DATE',
    value: 'DATE',
  },
  {
    label: 'DATETIME',
    value: 'DATETIME',
  },
  {
    label: 'TIMESTAMP',
    value: 'TIMESTAMP',
  },
];

function References({ classes, index, column }) {
  const {
    models,
    currentModel,
    changeColumnReferenceTableName,
    changeColumnReferenceColumn,
  } = useContext(ModelsContext);
  const selectedModel = models.find(
    model => model.name === column.referenceTableName
  );
  const selectModelColumns = selectedModel.columns || [];
  return (
    <>
      <TextField
        select
        label="Table Name"
        className={classes.textField}
        value={column.referenceTableName || ''}
        margin="normal"
        onChange={e => changeColumnReferenceTableName(index, e.target.value)}
        fullWidth
      >
        {models
          .filter(model => model.name !== currentModel.name)
          .map((model, key) => (
            <MenuItem key={key} value={model.name}>
              {model.name}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        select
        label="Column Reference"
        className={classes.textField}
        value={column.referenceColumn || ''}
        margin="normal"
        onChange={e => changeColumnReferenceColumn(index, e.target.value)}
        fullWidth
      >
        {selectModelColumns.map((column, key) => (
          <MenuItem key={key} value={column.name}>
            {column.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

function ColumnOptions() {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            // checked={this.state.checkedA}
            // onChange={this.handleChange('checkedA')}
            value="checkedA"
          />
        }
        label="Primary Key"
      />
      <FormControlLabel
        control={
          <Switch
            // checked={this.state.checkedB}
            // onChange={this.handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Auto Increment"
      />
      <FormControlLabel
        control={
          <Switch
            // checked={this.state.checkedB}
            // onChange={this.handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Allow Null"
      />
    </FormGroup>
  );
}

function ColumnDefinition({ classes, column, index }) {
  const { changeColumnName, changeColumnType, removeColumn } = useContext(
    ModelsContext
  );
  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <TextField
          label="Name"
          className={classes.textField}
          value={column.name}
          margin="normal"
          onChange={e => changeColumnName(index, e.target.value)}
        />
        <TextField
          select
          label="Type"
          className={classes.textField}
          value={column.type}
          margin="normal"
          onChange={e => changeColumnType(index, e.target.value)}
          fullWidth
        >
          {dataTypes.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          className={classes.close}
          color="inherit"
          aria-label="Settings"
          onClick={() => removeColumn(index)}
        >
          <Typography>
            <CloseIcon />
          </Typography>
        </IconButton>
      </div>
      <div className={classes.flex}>
        <ColumnOptions />
      </div>
      <div className={classes.flex}>
        {column.type === 'REFERENCES' && (
          <References classes={classes} column={column} index={index} />
        )}
      </div>
    </div>
  );
}

ColumnDefinition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColumnDefinition);
