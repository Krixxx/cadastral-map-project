import styled from 'styled-components'

export const SwitcherContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
  border: 1px solid #e0e0e0;
`

export const ToggleContainer = styled.div`
  display: flex;
  gap: 2px;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 2px;
`

export const ToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.active ? 'white' : 'transparent')};
  color: ${(props) => (props.active ? '#007bff' : '#666')};
  font-size: 12px;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  transition: all 0.2s ease;
  min-width: 60px;
  box-shadow: ${(props) =>
    props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background: ${(props) => (props.active ? 'white' : '#e9ecef')};
    color: ${(props) => (props.active ? '#007bff' : '#495057')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

export const LayerIcon = styled.span`
  font-size: 16px;
  margin-bottom: 2px;
`

export const ToggleLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`
