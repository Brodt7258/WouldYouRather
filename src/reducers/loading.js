import { IS_LOADED } from '../actions/loading';

export default (state = true, action) => {
  switch (action.type) {
    case IS_LOADED:
      return false;
    default:
      return state;
  }
}