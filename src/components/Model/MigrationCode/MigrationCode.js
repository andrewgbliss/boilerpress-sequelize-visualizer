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

function MigrationCode({ classes }) {
  const { currentModel } = useContext(ModelsContext);
  const tableName = currentModel.name ? `'${currentModel.name}'` : '';
  let columnDefinitions = '';
  if (currentModel.columns.length > 0) {
    const columns = compact(
      currentModel.columns.map(column => {
        const { name, type } = column;
        if (!name || !type) {
          return null;
        }
        let reference = '';
        if (column.referenceColumn) {
          reference = `references: {
            \t\t\tmodel: 'accounts',
            \t\t\tkey: 'id',
          \t\t\t},
          \t\t\tonUpdate: 'cascade',
          \t\t\tonDelete: 'cascade',
        `;
        }
        return `\t\t{
          \t\t\tname: '${name}',
          \t\t\ttype: Sequelize.${type},
          \t\t\t${reference}
        \t\t}`;
      })
    );
    if (columns.length > 0) {
      columnDefinitions = `, {
        ${columns.join(',\n\t')}
      \t\t}`;
    }
  }
  const sequelizeMigration = `
    module.exports = {
    \tup: (queryInterface, Sequelize) => {
    \t\treturn queryInterface.createTable(${tableName}${columnDefinitions});
    \t},
    \tdown: (queryInterface, Sequelize) => {
    \t\treturn queryInterface.dropTable(${tableName});
    \t}
    };
  `;
  return (
    <TextField
      label="Migration Code"
      multiline
      value={sequelizeMigration}
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth
      rows="10"
    />
  );
}

MigrationCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MigrationCode);
