import React, { useState } from 'react';
import {
  SearchBarDiv,
  SearchForm,
  SearchInput,
  SearchButton,
} from './SearchBarStyles';

import { ADD_TO_CADASTRAL_ARRAY } from '../../utils/actions';

import { connect } from 'react-redux';

const SearchBar = ({ addToArray }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToArray(value);
    setValue('');
  };
  return (
    <SearchBarDiv>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type='text'
          placeholder='katastrinumber'
          value={value}
          onChange={handleChange}
        />
        <SearchButton type='submit' value='Search' />
      </SearchForm>
    </SearchBarDiv>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToArray: (result) =>
      dispatch({ type: ADD_TO_CADASTRAL_ARRAY, payload: { result } }),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
