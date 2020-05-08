import { TOGGLE_MODAL } from '../actions/types';

const initialState = {
  isModalDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalDisplayed: action.payload,
      };
    default:
      return state;
  }
};
