import React, { useState } from 'react'
import {
  SearchBarDiv,
  SearchForm,
  SearchInput,
  SearchButton,
} from './SearchBarStyles'

import { ADD_TO_CADASTRAL_ARRAY } from '../../utils/actions'

import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  //kaardirakenduse päringute tegemine
  // https://geoportaal.maaamet.ee/est/Teenused/Poordumine-kaardirakendusse-labi-URLi-p9.html#xgis2-ky-tunnus

  //validate cadastral number format
  const regex = new RegExp(/^(([0-9]{5})+:+([0-9]{3})+:+([0-9]{4}))$/)

  // get initial array from localStorage if present and then add new cadastral number to array
  const saveToLocalStorage = (value) => {
    let array = JSON.parse(localStorage.getItem('cadastralArray') || '[]')

    array.push(value)

    localStorage.setItem('cadastralArray', JSON.stringify(array))
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //check for regex match
    if (regex.test(value)) {
      //add cadastral number to localStorage
      saveToLocalStorage(value)

      // add cadastral number to redux state
      dispatch({ type: ADD_TO_CADASTRAL_ARRAY, payload: { result: value } })

      //clear error
      setError('')

      //clear input
      setValue('')
    } else {
      //set error
      setError('Katastri number pole korrektne')
    }
  }

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
  )
}

export default SearchBar
