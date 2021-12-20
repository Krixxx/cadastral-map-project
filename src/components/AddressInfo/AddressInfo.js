import React from 'react';

import { AddressInfoSection } from './AddressInfoStyles';

import { connect } from 'react-redux';

const AddressInfo = ({ info }) => {
  return (
    <AddressInfoSection>
      <h1>Address Info:</h1>
      <p>{info}</p>
    </AddressInfoSection>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.activeObject,
  };
};

export default connect(mapStateToProps)(AddressInfo);
