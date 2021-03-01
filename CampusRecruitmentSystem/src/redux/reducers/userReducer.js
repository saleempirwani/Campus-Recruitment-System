import {GET_COMP_DATA, GET_STD_DATA} from '../../constants';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_COMP_DATA:
      return [...action.payload];
    case GET_STD_DATA:
      return [...action.payload];
    default:
      return state;
  }
};

export default userReducer;
