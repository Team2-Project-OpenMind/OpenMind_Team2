import { createContext, useState } from 'react';

export const LocalIdContext = createContext();

export function LocalIdContextProvider({ children }) {
  const [LocalId, setLocalId] = useState({});

  return (
    <LocalIdContext.Provider value={{ LocalId, setLocalId }}>{children}</LocalIdContext.Provider>
  );
}

export default LocalIdContext;
