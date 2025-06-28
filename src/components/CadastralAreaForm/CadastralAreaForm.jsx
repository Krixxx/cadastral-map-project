import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_CADASTRAL_AREA, CANCEL_DRAWING } from '../../utils/actions'
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from './CadastralAreaFormStyles'

/**
 * CadastralAreaForm component for entering metadata about a drawn polygon
 * Displays when a polygon drawing is finished and allows saving with metadata
 */
const CadastralAreaForm = () => {
  const dispatch = useDispatch()
  const currentPolygon = useSelector((state) => state.currentPolygon)
  const drawingMode = useSelector((state) => state.drawingMode)

  const [formData, setFormData] = useState({
    lotName: '',
    contactName: '',
    contactNumber: '',
  })
  const [errors, setErrors] = useState({})

  /**
   * Validates the form data and returns true if valid
   */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.lotName.trim()) {
      newErrors.lotName = 'Kinnistu nimi on vajalik'
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Kontakti nimi on vajalik'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Kontakti number on vajalik'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Sisesta kehtiv number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  /**
   * Saves the cadastral area with metadata
   */
  const handleSave = () => {
    if (validateForm()) {
      dispatch({
        type: SAVE_CADASTRAL_AREA,
        payload: {
          metadata: formData,
        },
      })

      // Reset form
      setFormData({
        lotName: '',
        contactName: '',
        contactNumber: '',
      })
      setErrors({})
    }
  }

  /**
   * Cancels the current drawing and form
   */
  const handleCancel = () => {
    dispatch({ type: CANCEL_DRAWING })
    setFormData({
      lotName: '',
      contactName: '',
      contactNumber: '',
    })
    setErrors({})
  }

  // Only show form when drawing is finished and we have a polygon
  if (drawingMode || currentPolygon.length === 0) {
    return null
  }

  return (
    <FormContainer>
      <FormTitle>Salvesta kinnistu</FormTitle>
      <FormGroup>
        <Label htmlFor='lotName'>Kinnistu nimi *</Label>
        <Input
          type='text'
          id='lotName'
          name='lotName'
          value={formData.lotName}
          onChange={handleInputChange}
          placeholder='Sisesta kinnistu nimi'
          hasError={!!errors.lotName}
        />
        {errors.lotName && <span className='error'>{errors.lotName}</span>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor='contactName'>Kontakti nimi *</Label>
        <Input
          type='text'
          id='contactName'
          name='contactName'
          value={formData.contactName}
          onChange={handleInputChange}
          placeholder='Sisesta kontakti nimi'
          hasError={!!errors.contactName}
        />
        {errors.contactName && (
          <span className='error'>{errors.contactName}</span>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor='contactNumber'>Kontakti number *</Label>
        <Input
          type='tel'
          id='contactNumber'
          name='contactNumber'
          value={formData.contactNumber}
          onChange={handleInputChange}
          placeholder='Sisesta kontakti number'
          hasError={!!errors.contactNumber}
        />
        {errors.contactNumber && (
          <span className='error'>{errors.contactNumber}</span>
        )}
      </FormGroup>

      <ButtonGroup>
        <Button onClick={handleSave} primary>
          Salvesta
        </Button>
        <Button onClick={handleCancel} secondary>
          Tühista
        </Button>
      </ButtonGroup>
    </FormContainer>
  )
}

export default CadastralAreaForm
