import {AnySlot} from '../model/Slots';

export interface AppState {
  user: { token: string } | null;
  slots: Record<string, AnySlot>;
}

export enum ActionType {
    SET_USER,
    EDIT_USER_FIELD,
    SET_SLOT,
}

export type Action =
    | {
    type: ActionType.SET_USER;
    payload: {
        token: string;
        email: string;
        is_staff: boolean;
        is_superuser: boolean;
    } | null
}
    | {
    type: ActionType.EDIT_USER_FIELD;
    payload: { field: string; value: unknown };
}
    | { type: ActionType.SET_SLOT; payload: { id: string; value: AnySlot } };

export const initialState: AppState = {
  user: null,
  slots: {},
};

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionType.SET_USER:
            console.log('set_user', action.payload);
            return {...state, user: action.payload};
        case ActionType.EDIT_USER_FIELD:
            console.log('edit_user_field', action.payload);
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.field]: action.payload.value,
                },
            };
        case ActionType.SET_SLOT:
            console.log('set_slot', action.payload);
            return {
                ...state,
                slots: {
                    ...state.slots,
                    [action.payload.id]: action.payload.value,
                },
            };
        default:
            return state;
    }
};

export default reducer;
