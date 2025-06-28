import React, { useEffect, useRef } from 'react'
import { Map } from './MapViewStyles'
import { useSelector, useDispatch } from 'react-redux'
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Polyline,
} from 'react-leaflet'
import { ADD_DRAWING_POINT } from '../../utils/actions'

const MapView = () => {
  const dispatch = useDispatch()
  const drawingMode = useSelector((state) => state.drawingMode)
  const currentPolygon = useSelector((state) => state.currentPolygon)
  const savedCadastralAreas = useSelector((state) => state.savedCadastralAreas)
  const mapLayer = useSelector((state) => state.mapLayer) || 'street'
  const position = [59.43696, 24.75353] // Tallinn center
  const mapRef = useRef(null)

  const drawingOptions = { color: 'blue', weight: 3, fillOpacity: 0.1 }
  const savedAreaOptions = { color: 'green', weight: 2, fillOpacity: 0.2 }

  /**
   * Gets the appropriate tile layer URL based on the selected map layer
   */
  const getTileLayerUrl = () => {
    switch (mapLayer) {
      case 'aerial':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      case 'street':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  }

  /**
   * Gets the appropriate attribution based on the selected map layer
   */
  const getTileLayerAttribution = () => {
    switch (mapLayer) {
      case 'aerial':
        return '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      case 'street':
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }

  /**
   * Handles map click events for polygon drawing
   */
  const handleMapClick = (e) => {
    if (drawingMode) {
      const { lat, lng } = e.latlng
      dispatch({
        type: ADD_DRAWING_POINT,
        payload: { point: [lat, lng] },
      })
    }
  }

  /**
   * Sets up map click event listener
   */
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current

      if (drawingMode) {
        map.on('click', handleMapClick)
        // Change cursor to indicate drawing mode
        map.getContainer().style.cursor = 'crosshair'
      } else {
        map.off('click', handleMapClick)
        // Reset cursor
        map.getContainer().style.cursor = ''
      }

      return () => {
        map.off('click', handleMapClick)
        map.getContainer().style.cursor = ''
      }
    }
  }, [drawingMode, dispatch])

  return (
    <Map id='map'>
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base tile layer */}
        <TileLayer
          attribution={getTileLayerAttribution()}
          url={getTileLayerUrl()}
        />

        {/* Display current drawing polygon */}
        {currentPolygon.length >= 3 && (
          <Polygon positions={currentPolygon} pathOptions={drawingOptions}>
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              <div>
                <strong>Drawing in Progress</strong>
                <br />
                Points: {currentPolygon.length}
                <br />
                Click "Finish Drawing" when done
              </div>
            </Tooltip>
          </Polygon>
        )}

        {/* Display current drawing polyline (for incomplete polygons) */}
        {currentPolygon.length >= 2 && currentPolygon.length < 3 && (
          <Polyline positions={currentPolygon} pathOptions={drawingOptions}>
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              <div>
                <strong>Drawing in Progress</strong>
                <br />
                Points: {currentPolygon.length}
                <br />
                Add more points to create a polygon
              </div>
            </Tooltip>
          </Polyline>
        )}

        {/* Display saved cadastral areas */}
        {savedCadastralAreas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.polygon}
            pathOptions={savedAreaOptions}
          >
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              <div>
                <strong>{area.lotName}</strong>
                <br />
                Contact: {area.contactName}
                <br />
                Phone: {area.contactNumber}
                <br />
                Points: {area.polygon.length}
              </div>
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
    </Map>
  )
}

export default MapView
