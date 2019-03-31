import React from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import Context from './Context';

const AppProvider = props => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [mode, setMode] = useLocalStorage('mode', 'edit');
  return (
    <Context.Provider
      value={{
        darkMode,
        setDarkMode,
        mode,
        setMode,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
