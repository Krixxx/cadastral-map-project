import React from 'react';
import { Map } from './MapViewStyles';

import { connect } from 'react-redux';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  Tooltip,
} from 'react-leaflet';

const MapView = ({ bounds = [] }) => {
  const position = [58.6858732964, 23.8404949068];

  const rectangle = bounds;

  const blackOptions = { color: 'black' };

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
        <Rectangle bounds={rectangle} pathOptions={blackOptions}>
          <Tooltip direction='bottom' offset={[0, 20]} opacity={1} sticky>
            This is this place
          </Tooltip>
        </Rectangle>
      </MapContainer>
    </Map>
  );
};

const mapStateToProps = (state) => {
  return {
    bounds: state.bounds,
  };
};

export default connect(mapStateToProps)(MapView);
