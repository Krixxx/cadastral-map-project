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
      newErrors.lotName = 'Lot name is required'
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid phone number'
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
      <FormTitle>Save Cadastral Area</FormTitle>
      <FormGroup>
        <Label htmlFor='lotName'>Lot Name *</Label>
        <Input
          type='text'
          id='lotName'
          name='lotName'
          value={formData.lotName}
          onChange={handleInputChange}
          placeholder='Enter lot name'
          hasError={!!errors.lotName}
        />
        {errors.lotName && <span className='error'>{errors.lotName}</span>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor='contactName'>Contact Name *</Label>
        <Input
          type='text'
          id='contactName'
          name='contactName'
          value={formData.contactName}
          onChange={handleInputChange}
          placeholder='Enter contact name'
          hasError={!!errors.contactName}
        />
        {errors.contactName && (
          <span className='error'>{errors.contactName}</span>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor='contactNumber'>Contact Number *</Label>
        <Input
          type='tel'
          id='contactNumber'
          name='contactNumber'
          value={formData.contactNumber}
          onChange={handleInputChange}
          placeholder='Enter contact number'
          hasError={!!errors.contactNumber}
        />
        {errors.contactNumber && (
          <span className='error'>{errors.contactNumber}</span>
        )}
      </FormGroup>

      <ButtonGroup>
        <Button onClick={handleSave} primary>
          Save Area
        </Button>
        <Button onClick={handleCancel} secondary>
          Cancel
        </Button>
      </ButtonGroup>
    </FormContainer>
  )
}

export default CadastralAreaForm
