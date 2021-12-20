import React from 'react';

import { ItemDiv, DeleteButton } from './SingleItemStyles';

const SingleItem = ({ item }) => {
  return (
    <ItemDiv>
      <p>{item}</p>
      <DeleteButton>&times;</DeleteButton>
    </ItemDiv>
  );
};

export default SingleItem;
