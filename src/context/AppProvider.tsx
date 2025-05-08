import React, {useReducer} from 'react';
import {AppContext} from './AppContext';
import reducer, {initialState} from './reducer';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};

export default AppProvider;