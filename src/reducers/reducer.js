import { SEARCH_CADASTRAL } from '../utils/actions';

function reducer(state, action) {
  if (action.type === SEARCH_CADASTRAL) {
    return { ...state, search: '11223:005:0022' };
  }
  return state;
}

export default reducer;
