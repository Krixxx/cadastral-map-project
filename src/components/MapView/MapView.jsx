import React from 'react'
import { Map } from './MapViewStyles'

import { useSelector } from 'react-redux'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  Tooltip,
} from 'react-leaflet'

const MapView = () => {
  const bounds = useSelector((state) => state.bounds)
  const position = [59.43696, 24.75353]

  const rectangle = bounds

  const blackOptions = { color: 'black' }

  // Maaametist tulevad koordinaadid on L-EST formaadis ning need tuleb teisendada GEO formaati
  // rohkem infot siin: https://gpa.maaamet.ee/calc/geo-lest/url/
  // siit saab ehk valemi: https://gpa.maaamet.ee/calc/geo-lest/files/Lambert.pdf
  // kindlasti leiab mingi valemi, et teha helper funktsioon teisendamiseks

  return (
    <Map id='map'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {rectangle.length !== 0 ? (
          <Rectangle bounds={rectangle} pathOptions={blackOptions}>
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
              This is this place
            </Tooltip>
          </Rectangle>
        ) : (
          <Marker position={position}>
            <Popup>Tallinn</Popup>
          </Marker>
        )}
      </MapContainer>
    </Map>
  )
}

export default MapView
