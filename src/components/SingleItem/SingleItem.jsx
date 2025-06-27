import React from 'react';

import { ItemDiv, Text, DeleteButton } from './SingleItemStyles';

import { connect } from 'react-redux';
import { REFRESH_ARRAY, SET_SELECTED_ITEM } from '../../utils/actions';

const SingleItem = ({ item, array, refreshArray, setSelectedItem }) => {
  //show cadastral info on top section
  const loadCadastralInfo = (item) => {
    setSelectedItem(item);

    //TODO: currently we send only cadastral number. Goal is to send as much information about object, as possible. And also show selected object on map.
  };

  //delete item from a list
  const deleteItem = (item) => {
    array = array.filter((i) => i !== item);

    localStorage.setItem('cadastralArray', JSON.stringify(array));

    refreshArray(array);
  };

  return (
    <ItemDiv>
      <Text onClick={() => loadCadastralInfo(item)}>{item}</Text>
      <DeleteButton onClick={() => deleteItem(item)}>&times;</DeleteButton>
    </ItemDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    array: state.cadastralList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshArray: (list) =>
      dispatch({ type: REFRESH_ARRAY, payload: { list } }),
    setSelectedItem: (item) =>
      dispatch({ type: SET_SELECTED_ITEM, payload: { item } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
