import styled from 'styled-components'

export const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  /* Remove focus outline and borders from polygon elements */
  .leaflet-interactive {
    outline: none !important;
    border: none !important;
  }

  /* Remove any default focus styles */
  .leaflet-interactive:focus {
    outline: none !important;
    border: none !important;
  }

  /* Remove any selection styles */
  .leaflet-interactive::selection {
    background: transparent !important;
  }
`
