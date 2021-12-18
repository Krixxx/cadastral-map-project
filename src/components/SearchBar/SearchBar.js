import React, { useState } from 'react';
import { SearchForm, SearchInput, SearchButton } from './SearchBarStyles';

const SearchBar = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type='text'
        placeholder='katastrinumber'
        value={value}
        onChange={handleChange}
      />
      <SearchButton type='submit' value='Search' />
    </SearchForm>
  );
};

export default SearchBar;
