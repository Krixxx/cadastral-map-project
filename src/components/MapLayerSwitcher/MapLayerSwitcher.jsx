import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MAP_LAYER } from '../../utils/actions'
import {
  SwitcherContainer,
  ToggleContainer,
  ToggleButton,
  ToggleLabel,
  LayerIcon,
} from './MapLayerSwitcherStyles'

/**
 * MapLayerSwitcher component provides a toggle to switch between map layers
 * Allows users to choose between street view and aerial/satellite view
 */
const MapLayerSwitcher = () => {
  const dispatch = useDispatch()
  const currentLayer = useSelector((state) => state.mapLayer) || 'street'

  /**
   * Handles layer switching between street and aerial views
   */
  const handleLayerSwitch = (layer) => {
    dispatch({
      type: SET_MAP_LAYER,
      payload: { layer },
    })
  }

  return (
    <SwitcherContainer>
      <ToggleContainer>
        <ToggleButton
          active={currentLayer === 'street'}
          onClick={() => handleLayerSwitch('street')}
        >
          <LayerIcon>🗺️</LayerIcon>
          <ToggleLabel>Kaart</ToggleLabel>
        </ToggleButton>

        <ToggleButton
          active={currentLayer === 'aerial'}
          onClick={() => handleLayerSwitch('aerial')}
        >
          <LayerIcon>🛰️</LayerIcon>
          <ToggleLabel>Satelliit</ToggleLabel>
        </ToggleButton>
      </ToggleContainer>
    </SwitcherContainer>
  )
}

export default MapLayerSwitcher
