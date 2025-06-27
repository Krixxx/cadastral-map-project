import React from 'react'

import { AddressInfoSection } from './AddressInfoStyles'

import { useSelector } from 'react-redux'

const AddressInfo = () => {
  const info = useSelector((state) => state.activeObject)

  return (
    <AddressInfoSection>
      <h1>Address Info:</h1>
      <p>{info}</p>
    </AddressInfoSection>
  )
}

export default AddressInfo
