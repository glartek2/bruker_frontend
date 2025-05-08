import {User} from '../model/User';

export interface AppState {
    user: User | null;
}

export type Action =
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'EDIT_USER_FIELD'; payload: { field: string; value: any } };

export const initialState: AppState = {
    user: null,
};

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'EDIT_USER_FIELD':
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.field]: action.payload.value,
                },
            };
        default:
            console.error('Unhandled action type:', action);
            return state;
    }
};

export default reducer;
