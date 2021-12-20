import styled from 'styled-components';

const ItemDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;

export { ItemDiv, DeleteButton };
