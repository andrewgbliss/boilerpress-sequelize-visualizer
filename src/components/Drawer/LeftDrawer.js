import React, { useContext } from 'react';
import ModelsContext from 'context/Models/Context';
import Drawer from 'components/Drawer/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppsIcon from '@material-ui/icons/Apps';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ModelsList() {
  const { models, changeCurrentModel } = useContext(ModelsContext);
  return (
    <List>
      {models.map((model, key) => {
        return (
          <ListItem key={key} button onClick={() => changeCurrentModel(key)}>
            <ListItemText
              primary={model.name}
              secondary={new Date(model.migrationCreatedAt).toUTCString()}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

function LeftDrawer() {
  const { addModel } = useContext(ModelsContext);
  return (
    <Drawer align="left" icon={AppsIcon}>
      <Typography
        component="h5"
        variant="h6"
        align="center"
        style={{
          margin: 10,
        }}
      >
        Models
      </Typography>
      <Divider />
      <ModelsList />
      <Divider />
      <br />
      <Button variant="outlined" onClick={addModel}>
        Add Model
      </Button>
    </Drawer>
  );
}

export default LeftDrawer;
