import React from 'react'
import { Map } from './MapViewStyles'

import { useSelector } from 'react-redux'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  Polygon,
  Tooltip,
} from 'react-leaflet'
import { transformPolygon } from '../../utils/coordinateTransform'

const MapView = () => {
  const bounds = useSelector((state) => state.bounds)
  const cadastralData = useSelector((state) => state.cadastralData)
  const loading = useSelector((state) => state.loading)
  const position = [59.43696, 24.75353] // Tallinn center

  const blackOptions = { color: 'black', weight: 2, fillOpacity: 0.1 }
  const selectedOptions = { color: 'red', weight: 3, fillOpacity: 0.2 }

  // Transform cadastral unit geometry for display
  const getCadastralGeometry = () => {
    if (!cadastralData || !cadastralData.geometry) {
      return null
    }

    const { geometry } = cadastralData

    if (geometry.type === 'Polygon' && geometry.coordinates) {
      // Transform coordinates from L-EST to WGS84
      const transformedCoords = transformPolygon(geometry.coordinates[0])
      return transformedCoords
    }

    if (geometry.type === 'MultiPolygon' && geometry.coordinates) {
      // Handle multi-polygon case
      const transformedPolygons = geometry.coordinates.map((polygon) =>
        polygon[0].map((coord) => transformPolygon([coord])[0])
      )
      return transformedPolygons
    }

    return null
  }

  const cadastralGeometry = getCadastralGeometry()

  return (
    <Map id='map'>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Display cadastral unit boundary */}
        {cadastralGeometry && (
          <Polygon positions={cadastralGeometry} pathOptions={selectedOptions}>
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              <div>
                <strong>Katastriyksus</strong>
                <br />
                {cadastralData.properties.name}
                <br />
                Pindala: {cadastralData.properties.area} m²
                <br />
                Aadress: {cadastralData.properties.address}
              </div>
            </Tooltip>
          </Polygon>
        )}

        {/* Fallback rectangle if no polygon data */}
        {bounds && bounds.length !== 0 && !cadastralGeometry && (
          <Rectangle bounds={bounds} pathOptions={blackOptions}>
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              Katastriyksuse piirid
            </Tooltip>
          </Rectangle>
        )}

        {/* Default marker if no cadastral data */}
        {!cadastralGeometry && bounds.length === 0 && (
          <Marker position={position}>
            <Popup>Tallinn</Popup>
          </Marker>
        )}
      </MapContainer>
    </Map>
  )
}

export default MapView
