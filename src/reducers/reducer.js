import {
  START_DRAWING,
  ADD_DRAWING_POINT,
  FINISH_DRAWING,
  CANCEL_DRAWING,
  SAVE_CADASTRAL_AREA,
  DELETE_CADASTRAL_AREA,
  SET_DRAWING_MODE,
  SET_MAP_LAYER,
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
  return state
}

export default reducer
