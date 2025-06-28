import styled from 'styled-components'

export const DrawingControlsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  border: 1px solid #e0e0e0;
`

export const Button = styled.button`
  padding: 10px 16px;
  margin: 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;

  ${(props) =>
    props.primary &&
    `
    background-color: #007bff;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
    
    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}

  ${(props) =>
    props.secondary &&
    `
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  `}
`

export const Instructions = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #007bff;
`
