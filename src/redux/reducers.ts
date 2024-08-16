import { SETUSERINFO, SETTOKEN } from './type'

const initialState = {
  token:'',
  userInfo: {},
};

export const rootReducer = (state = initialState, action: { type: any; data: any; }) => {
  switch (action.type) {
    case SETUSERINFO:
      return { ...state, userInfo: action.data };
     case SETTOKEN:
        return { ...state, token: action.data };
    default:
      return state;
  }
};