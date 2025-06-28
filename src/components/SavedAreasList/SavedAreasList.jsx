import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DELETE_CADASTRAL_AREA,
  CENTER_ON_ALL_AREAS,
  CENTER_ON_AREA,
  SET_SELECTED_AREA,
} from '../../utils/actions'
import {
  Container,
  Title,
  AreaItem,
  AreaHeader,
  AreaDetails,
  DeleteButton,
  EmptyMessage,
  GroupHeader,
} from './SavedAreasListStyles'

/**
 * SavedAreasList component displays all saved cadastral areas
 * Shows area metadata and provides delete functionality
 */
const SavedAreasList = () => {
  const dispatch = useDispatch()
  const savedAreas = useSelector((state) => state.savedCadastralAreas)
  const selectedAreaId = useSelector((state) => state.selectedAreaId)

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
   * Centers the view on all areas
   */
  const handleCenterOnAllAreas = () => {
    dispatch({
      type: CENTER_ON_ALL_AREAS,
    })
    // Clear selection when viewing all areas
    dispatch({
      type: SET_SELECTED_AREA,
      payload: { areaId: null },
    })
  }

  /**
   * Centers the view on a specific area and selects it
   */
  const handleCenterOnArea = (areaId) => {
    dispatch({
      type: CENTER_ON_AREA,
      payload: { areaId },
    })
    dispatch({
      type: SET_SELECTED_AREA,
      payload: { areaId },
    })
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

      {/* Ühistu group header */}
      <GroupHeader onClick={handleCenterOnAllAreas}>
        <h3>Ühistu</h3>
        <span>Click to view all areas</span>
      </GroupHeader>

      {savedAreas.map((area) => (
        <AreaItem
          key={area.id}
          onClick={() => handleCenterOnArea(area.id)}
          className={area.id === selectedAreaId ? 'selected' : ''}
        >
          <AreaHeader>
            <h4 style={{ cursor: 'pointer' }}>{area.lotName}</h4>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering the area click
                handleDelete(area.id)
              }}
            >
              ×
            </DeleteButton>
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
