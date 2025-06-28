import {
  ADD_TO_CADASTRAL_ARRAY,
  REFRESH_ARRAY,
  SET_SELECTED_ITEM,
  SET_CADASTRAL_DATA,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
} from '../utils/actions'

//initial store
const initialStore = {
  cadastralList: JSON.parse(localStorage.getItem('cadastralArray')) || [],
  bounds: [
    [58.684863567395, 23.837261336526],
    [58.687561865801, 23.84372545375222],
  ],
  activeObject: '',
  cadastralData: null,
  loading: false,
  error: null,
}

function reducer(state = initialStore, action) {
  if (action.type === ADD_TO_CADASTRAL_ARRAY) {
    return {
      ...state,
      cadastralList: [...state.cadastralList, action.payload.result],
    }
  }
  if (action.type === REFRESH_ARRAY) {
    return {
      ...state,
      cadastralList: action.payload.list,
    }
  }
  if (action.type === SET_SELECTED_ITEM) {
    return {
      ...state,
      activeObject: action.payload.item,
    }
  }
  if (action.type === SET_CADASTRAL_DATA) {
    return {
      ...state,
      cadastralData: action.payload.data,
      bounds: action.payload.data.bounds || state.bounds,
      error: null,
    }
  }
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: action.payload.loading,
    }
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload.error,
      loading: false,
    }
  }
  if (action.type === CLEAR_ERROR) {
    return {
      ...state,
      error: null,
    }
  }
  return state
}

export default reducer
