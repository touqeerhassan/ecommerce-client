import { combineReducers } from 'redux';

const products = (state = [], action) => {
  switch (action.type) {
    case 'product':
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
      return state;
    default:
      return state;
  }
}


export default combineReducers({
  products
})