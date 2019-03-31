import React, { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import Context from './Context';

const ModelsProvider = props => {
  const [models, setModels] = useLocalStorage('models', []);
  const [currentModelIndex, setCurrentModelIndex] = useLocalStorage(
    'currentModelIndex',
    0
  );
  const [currentModel, setCurrentModel] = useState(models[currentModelIndex]);
  const addModel = () => {
    const newModel = {
      name: '',
      migrationCreatedAt: new Date(),
      columns: [],
    };
    const newModels = [...models, newModel];
    setModels(newModels);
    changeCurrentModel(newModels.length - 1);
    setCurrentModelIndex(newModels.length - 1);
    setCurrentModel(newModel);
  };
  const removeModel = () => {
    const newModels = [
      ...models.slice(0, currentModelIndex),
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
    changeCurrentModel(0);
  };
  const setModelName = name => {
    currentModel.name = name;
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const changeCurrentModel = index => {
    setCurrentModelIndex(index);
    setCurrentModel(models[index]);
  };
  const addNewColumn = () => {
    const { columns } = currentModel;
    columns.push({
      name: '',
      type: '',
    });
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const changeColumnName = (index, name) => {
    currentModel.columns[index].name = name;
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const changeColumnType = (index, type) => {
    currentModel.columns[index].type = type;
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const removeColumn = index => {
    currentModel.columns = [
      ...currentModel.columns.slice(0, index),
      ...currentModel.columns.slice(index + 1),
    ];
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const changeColumnReferenceTableName = (index, value) => {
    currentModel.columns[index].referenceTableName = value;
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  const changeColumnReferenceColumn = (index, value) => {
    currentModel.columns[index].referenceColumn = value;
    const newModels = [
      ...models.slice(0, currentModelIndex),
      currentModel,
      ...models.slice(currentModelIndex + 1),
    ];
    setModels(newModels);
  };
  return (
    <Context.Provider
      value={{
        models,
        addModel,
        removeModel,
        setModels,
        setModelName,
        changeCurrentModel,
        addNewColumn,
        currentModel,
        changeColumnName,
        changeColumnType,
        removeColumn,
        changeColumnReferenceTableName,
        changeColumnReferenceColumn,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ModelsProvider;
