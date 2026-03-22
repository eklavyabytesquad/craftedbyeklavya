import * as React from 'react';

export function getStrictContext(contextName) {
  const Context = React.createContext(undefined);

  function Provider({ children, value }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(
        `use${contextName} must be used within a ${contextName}Provider`
      );
    }
    return context;
  }

  return [Provider, useContext];
}
