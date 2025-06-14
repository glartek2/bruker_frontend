import React, { useContext } from 'react';

export interface AppContextType {
  state: {
    user: { token: string } | null;
  };
  dispatch: React.Dispatch<unknown>;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

export const useAuth = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};
