import React from 'react';

import { ItemDiv, Text, DeleteButton } from './SingleItemStyles';

import { connect } from 'react-redux';
import { REFRESH_ARRAY } from '../../utils/actions';

const SingleItem = ({ item, array, refreshArray }) => {
  //show cadastral info on top section
  const loadCadastralInfo = (item) => {};

  //delete item from a list
  const deleteItem = (item) => {
    array = array.filter((i) => i !== item);

    localStorage.setItem('cadastralArray', JSON.stringify(array));

    refreshArray(array);
  };

  return (
    <ItemDiv>
      <Text onClick={loadCadastralInfo}>{item}</Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
