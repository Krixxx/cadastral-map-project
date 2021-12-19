import styled from 'styled-components';

const SearchBarDiv = styled.div`
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  padding: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.25rem;
`;

const SearchButton = styled.input`
  margin-left: 0.5rem;
  padding: 0.25rem;
`;

export { SearchBarDiv, SearchForm, SearchInput, SearchButton };
