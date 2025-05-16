import { User } from '../model/User';

export interface AppState {
  user: User | null;
}

export enum ActionType {
  SET_USER,
  EDIT_USER_FIELD,
}

export type Action =
  | { type: ActionType.SET_USER; payload: User | null }
  | {
      type: ActionType.EDIT_USER_FIELD;
      payload: { field: string; value: any };
    };

export const initialState: AppState = {
  user: null,
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.EDIT_USER_FIELD:
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
  }
};

export default reducer;
