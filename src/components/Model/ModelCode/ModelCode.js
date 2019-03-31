import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compact from 'lodash/compact';
import ModelsContext from 'context/Models/Context';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function ModelCode({ classes }) {
  const { currentModel } = useContext(ModelsContext);
  const tableName = currentModel.name ? `'${currentModel.name}'` : '';
  let columnDefinitions = '';
  if (currentModel.columns.length > 0) {
    const columns = compact(
      currentModel.columns.map(({ name, type }) => {
        if (!name || !type) {
          return null;
        }
        return `\t{
          \t\tname: '${name}',
          \t\ttype: DataTypes.${type},
        \t}`;
      })
    );
    if (columns.length > 0) {
      columnDefinitions = `, {
        ${columns.join(',\n\t')}
      }`;
    }
  }
  const currentModelOptions = '';
  const sequelizeCurrentModel = `
    module.exports = (sequelize, DataTypes) => {
      const ${
        currentModel.name
      } = sequelize.define(${tableName}${columnDefinitions}${currentModelOptions});
      return ${currentModel.name};
    };
  `;
  return (
    <TextField
      label="Model Code"
      multiline
      value={sequelizeCurrentModel}
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth
      rows="10"
    />
  );
}

ModelCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelCode);
