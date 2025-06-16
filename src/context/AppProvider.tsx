import React, {useReducer, useMemo, useEffect} from 'react';
import {AppContext} from './AppContext';
import reducer, {initialState, AppState} from './reducer';
import {useCookies} from 'react-cookie';

const TOKEN_COOKIE = 'app_token';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_COOKIE]);

    const init = (): AppState => ({
        ...initialState,
        user: cookies[TOKEN_COOKIE] ? {token: cookies[TOKEN_COOKIE]} : null,
    });

    const [state, dispatch] = useReducer(reducer, undefined, init);

    useEffect(() => {
        if (state.user)
            setCookie(TOKEN_COOKIE, state.user.token, {path: '/', sameSite: 'lax'});
        else removeCookie(TOKEN_COOKIE, {path: '/'});
    }, [state.user, setCookie, removeCookie]);

    const value = useMemo(() => ({state, dispatch}), [state]);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;