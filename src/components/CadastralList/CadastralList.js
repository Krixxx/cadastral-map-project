import React from 'react';

//connect redux
//connect is higher order component
import { connect } from 'react-redux';

const CadastralList = ({ search }) => {
  return (
    <section>
      <h1>Cadastral List</h1>
      {search}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps)(CadastralList);
