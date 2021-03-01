import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP} from '../../constants';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userType: null,
  standard: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload.token,
        userType: action.payload.userType,
        standard: action.payload.standard,
        isLoading: false,
      };
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        isSignout: false,
        isLoading: false,
        userToken: action.payload.token,
        userType: action.payload.userType,
        standard: action.payload.standard,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        userType: null,
        standard: null,
      };
    default:
      return state;
  }
};

export default authReducer;
