import React from 'react';

import { SingleItem } from '../';

//connect redux
//connect is higher order component
import { connect } from 'react-redux';

const CadastralList = ({ cadastralList = [] }) => {
  if (cadastralList.length === 0) {
    return (
      <section>
        <h1>Cadastral List</h1>
        <p>List is empty</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Cadastral List</h1>
      {cadastralList.map((element, i) => {
        return <SingleItem key={i} item={element} />;
      })}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    cadastralList: state.cadastralList,
  };
};

export default connect(mapStateToProps)(CadastralList);
