import React, { useState } from 'react'
import {
  SearchBarDiv,
  SearchForm,
  SearchInput,
  SearchButton,
  ErrorMessage,
  LoadingSpinner,
} from './SearchBarStyles'

import {
  ADD_TO_CADASTRAL_ARRAY,
  SET_CADASTRAL_DATA,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
} from '../../utils/actions'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCadastralData } from '../../utils/cadastralApi'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [localError, setLocalError] = useState('')

  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

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
    // Clear errors when user starts typing
    if (localError) {
      setLocalError('')
    }
    if (error) {
      dispatch({ type: CLEAR_ERROR })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //check for regex match
    if (!regex.test(value)) {
      setLocalError('Katastri number pole korrektne')
      return
    }

    try {
      // Set loading state
      dispatch({ type: SET_LOADING, payload: { loading: true } })

      // Clear any previous errors
      dispatch({ type: CLEAR_ERROR })
      setLocalError('')

      // Fetch cadastral data from API
      const cadastralData = await fetchCadastralData(value)

      // Add cadastral number to localStorage
      saveToLocalStorage(value)

      // Add cadastral number to redux state
      dispatch({ type: ADD_TO_CADASTRAL_ARRAY, payload: { result: value } })

      // Set cadastral data in redux state
      dispatch({
        type: SET_CADASTRAL_DATA,
        payload: { data: cadastralData },
      })

      // Clear input
      setValue('')
    } catch (error) {
      console.error('Search error:', error)
      dispatch({
        type: SET_ERROR,
        payload: { error: error.message || 'Viga katastriandmete laadimisel' },
      })
    } finally {
      // Clear loading state
      dispatch({ type: SET_LOADING, payload: { loading: false } })
    }
  }

  return (
    <SearchBarDiv>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type='text'
          placeholder='katastrinumber (nt: 12345:123:1234)'
          value={value}
          onChange={handleChange}
          disabled={loading}
        />
        <SearchButton type='submit' value='Search' disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Search'}
        </SearchButton>
      </SearchForm>
      {(localError || error) && (
        <ErrorMessage>{localError || error}</ErrorMessage>
      )}
    </SearchBarDiv>
  )
}

export default SearchBar
