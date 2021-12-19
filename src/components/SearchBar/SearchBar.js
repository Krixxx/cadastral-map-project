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
  const [error, setError] = useState('');

  //kaardirakenduse päringute tegemine
  // https://geoportaal.maaamet.ee/est/Teenused/Poordumine-kaardirakendusse-labi-URLi-p9.html#xgis2-ky-tunnus

  //validate cadastral number format
  const regex = new RegExp(/^(([0-9]{5})+:+([0-9]{3})+:+([0-9]{4}))$/);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //check for regex match
    if (regex.test(value)) {
      addToArray(value);
      setValue('');
    } else {
      setError('Katastri number pole korrektne');
    }
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
