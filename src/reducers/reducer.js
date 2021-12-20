import { ADD_TO_CADASTRAL_ARRAY, REFRESH_ARRAY } from '../utils/actions';

//initial store
const initialStore = {
  cadastralList: JSON.parse(localStorage.getItem('cadastralArray')) || [],
  bounds: [
    [58.684863567395, 23.837261336526],
    [58.687561865801, 23.84372545375222],
  ],
};

function reducer(state = initialStore, action) {
  if (action.type === ADD_TO_CADASTRAL_ARRAY) {
    return {
      ...state,
      cadastralList: [...state.cadastralList, action.payload.result],
    };
  }
  if (action.type === REFRESH_ARRAY) {
    return {
      ...state,
      cadastralList: action.payload.list,
    };
  }
  return state;
}

export default reducer;
