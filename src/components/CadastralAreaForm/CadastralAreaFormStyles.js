import styled from 'styled-components'

export const FormContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 300px;
  border: 1px solid #e0e0e0;
  max-height: 80vh;
  overflow-y: auto;
`

export const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;

  .error {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
    display: block;
  }
`

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.hasError ? '#dc3545' : '#ddd')};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? '#dc3545' : '#007bff')};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }

  &::placeholder {
    color: #999;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

export const Button = styled.button`
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) =>
    props.primary &&
    `
    background-color: #28a745;
    color: white;
    
    &:hover {
      background-color: #218838;
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
