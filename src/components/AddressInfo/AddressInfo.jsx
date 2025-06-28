import React from 'react'

import {
  AddressInfoSection,
  InfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
} from './AddressInfoStyles'

import { useSelector } from 'react-redux'

const AddressInfo = () => {
  const cadastralData = useSelector((state) => state.cadastralData)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

  if (loading) {
    return (
      <AddressInfoSection>
        <h2>Katastriandmed</h2>
        <p>Andmeid laetakse...</p>
      </AddressInfoSection>
    )
  }

  if (error) {
    return (
      <AddressInfoSection>
        <h2>Katastriandmed</h2>
        <p style={{ color: 'red' }}>Viga: {error}</p>
      </AddressInfoSection>
    )
  }

  if (!cadastralData) {
    return (
      <AddressInfoSection>
        <h2>Katastriandmed</h2>
        <p>Sisesta katastrinumber otsimiseks</p>
      </AddressInfoSection>
    )
  }

  return (
    <AddressInfoSection>
      <h2>Katastriandmed</h2>
      <InfoCard>
        <InfoRow>
          <InfoLabel>Katastrinumber:</InfoLabel>
          <InfoValue>{cadastralData.cadastralNumber}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Nimi:</InfoLabel>
          <InfoValue>{cadastralData.properties.name}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Aadress:</InfoLabel>
          <InfoValue>{cadastralData.properties.address}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Pindala:</InfoLabel>
          <InfoValue>{cadastralData.properties.area} m²</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Omavalitsus:</InfoLabel>
          <InfoValue>{cadastralData.properties.municipality}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Maakond:</InfoLabel>
          <InfoValue>{cadastralData.properties.county}</InfoValue>
        </InfoRow>
      </InfoCard>
    </AddressInfoSection>
  )
}

export default AddressInfo
