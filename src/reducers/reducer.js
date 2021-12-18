import { ADD_TO_CADASTRAL_ARRAY } from '../utils/actions';

//initial store
const initialStore = {
  search: '12345:003:0022',
  cadastralList: ['12345:003:0022', '54321:001:0011'],
};

function reducer(state = initialStore, action) {
  if (action.type === ADD_TO_CADASTRAL_ARRAY) {
    return {
      ...state,
      cadastralList: [...state.cadastralList, action.payload.result],
    };
  }
  return state;
}

export default reducer;
