import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_CADASTRAL_AREA } from '../../utils/actions'
import {
  Container,
  Title,
  AreaItem,
  AreaHeader,
  AreaDetails,
  DeleteButton,
  EmptyMessage,
} from './SavedAreasListStyles'

/**
 * SavedAreasList component displays all saved cadastral areas
 * Shows area metadata and provides delete functionality
 */
const SavedAreasList = () => {
  const dispatch = useDispatch()
  const savedAreas = useSelector((state) => state.savedCadastralAreas)

  /**
   * Deletes a cadastral area by ID
   */
  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this cadastral area?')
    ) {
      dispatch({
        type: DELETE_CADASTRAL_AREA,
        payload: { id },
      })
    }
  }

  /**
   * Formats the creation date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (savedAreas.length === 0) {
    return (
      <Container>
        <Title>Saved Cadastral Areas</Title>
        <EmptyMessage>
          No saved areas yet. Draw a polygon to create your first cadastral
          area.
        </EmptyMessage>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Saved Cadastral Areas ({savedAreas.length})</Title>
      {savedAreas.map((area) => (
        <AreaItem key={area.id}>
          <AreaHeader>
            <h4>{area.lotName}</h4>
            <DeleteButton onClick={() => handleDelete(area.id)}>×</DeleteButton>
          </AreaHeader>
          <AreaDetails>
            <div>
              <strong>Contact:</strong> {area.contactName}
            </div>
            <div>
              <strong>Phone:</strong> {area.contactNumber}
            </div>
            <div>
              <strong>Points:</strong> {area.polygon.length}
            </div>
            <div>
              <strong>Created:</strong> {formatDate(area.createdAt)}
            </div>
          </AreaDetails>
        </AreaItem>
      ))}
    </Container>
  )
}

export default SavedAreasList
