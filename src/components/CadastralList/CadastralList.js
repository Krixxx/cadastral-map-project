import React from 'react';

const CadastralList = ({ list }) => {
  const { search } = list;
  return (
    <section>
      <h1>Cadastral List</h1>
      {search}
    </section>
  );
};

export default CadastralList;
