import {
  START_DRAWING,
  ADD_DRAWING_POINT,
  FINISH_DRAWING,
  CANCEL_DRAWING,
  SAVE_CADASTRAL_AREA,
  DELETE_CADASTRAL_AREA,
  SET_DRAWING_MODE,
  SET_MAP_LAYER,
  CENTER_ON_ALL_AREAS,
  CENTER_ON_AREA,
  RESET_CENTER_TARGET,
  SET_SELECTED_AREA,
  SET_INITIAL_STATE_LOADED,
} from '../utils/actions'

//initial store
const initialStore = {
  // Polygon drawing state
  drawingMode: false,
  currentPolygon: [],
  savedCadastralAreas:
    JSON.parse(localStorage.getItem('savedCadastralAreas')) || [],
  // Map layer state
  mapLayer: localStorage.getItem('mapLayer') || 'street',
  // Map centering state
  centerTarget: null, // null, 'all', or area ID
  // Selection state
  selectedAreaId: null, // ID of currently selected area
  // Initialization state
  isInitialStateLoaded: false, // Whether Redux state has been loaded from localStorage
}

function reducer(state = initialStore, action) {
  if (action.type === SET_DRAWING_MODE) {
    return {
      ...state,
      drawingMode: action.payload.drawingMode,
    }
  }
  if (action.type === START_DRAWING) {
    return {
      ...state,
      drawingMode: true,
      currentPolygon: [],
    }
  }
  if (action.type === ADD_DRAWING_POINT) {
    return {
      ...state,
      currentPolygon: [...state.currentPolygon, action.payload.point],
    }
  }
  if (action.type === FINISH_DRAWING) {
    return {
      ...state,
      drawingMode: false,
    }
  }
  if (action.type === CANCEL_DRAWING) {
    return {
      ...state,
      drawingMode: false,
      currentPolygon: [],
    }
  }
  if (action.type === SAVE_CADASTRAL_AREA) {
    const newArea = {
      id: Date.now().toString(),
      polygon: state.currentPolygon,
      ...action.payload.metadata,
      createdAt: new Date().toISOString(),
    }
    const updatedAreas = [...state.savedCadastralAreas, newArea]
    localStorage.setItem('savedCadastralAreas', JSON.stringify(updatedAreas))
    return {
      ...state,
      savedCadastralAreas: updatedAreas,
      currentPolygon: [],
    }
  }
  if (action.type === DELETE_CADASTRAL_AREA) {
    const updatedAreas = state.savedCadastralAreas.filter(
      (area) => area.id !== action.payload.id
    )
    localStorage.setItem('savedCadastralAreas', JSON.stringify(updatedAreas))
    return {
      ...state,
      savedCadastralAreas: updatedAreas,
    }
  }
  if (action.type === SET_MAP_LAYER) {
    localStorage.setItem('mapLayer', action.payload.layer)
    return {
      ...state,
      mapLayer: action.payload.layer,
    }
  }
  if (action.type === CENTER_ON_ALL_AREAS) {
    return {
      ...state,
      centerTarget: 'all',
    }
  }
  if (action.type === CENTER_ON_AREA) {
    return {
      ...state,
      centerTarget: action.payload.areaId,
    }
  }
  if (action.type === RESET_CENTER_TARGET) {
    return {
      ...state,
      centerTarget: null,
    }
  }
  if (action.type === SET_SELECTED_AREA) {
    return {
      ...state,
      selectedAreaId: action.payload.areaId,
    }
  }
  if (action.type === SET_INITIAL_STATE_LOADED) {
    return {
      ...state,
      isInitialStateLoaded: true,
    }
  }
  return state
}

export default reducer
