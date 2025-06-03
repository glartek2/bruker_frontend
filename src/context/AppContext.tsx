import React, { useContext } from 'react';
import { User } from '../model/User';

export interface AppContextType {
  state: {
    user: User | null;
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
