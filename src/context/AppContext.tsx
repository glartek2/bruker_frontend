import React, { useContext } from 'react';
import { AnySlot } from '../model/slots';
import { Action } from './reducer';

export interface AppContextType {
  state: {
    user: {
        token: string;
        email: string;
        is_staff: boolean;
        is_superuser: boolean;
    } | null;
    slots: { [id: string]: AnySlot };
  };
  dispatch: React.ActionDispatch<[action: Action]>;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
