import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  START_DRAWING,
  FINISH_DRAWING,
  CANCEL_DRAWING,
} from '../../utils/actions'
import {
  DrawingControlsContainer,
  Button,
  Instructions,
} from './DrawingControlsStyles'

/**
 * DrawingControls component provides UI controls for polygon drawing functionality
 * Allows users to start, finish, and cancel polygon drawing on the map
 */
const DrawingControls = () => {
  const dispatch = useDispatch()
  const drawingMode = useSelector((state) => state.drawingMode)
  const currentPolygon = useSelector((state) => state.currentPolygon)

  /**
   * Starts the drawing mode and clears any existing polygon
   */
  const handleStartDrawing = () => {
    dispatch({ type: START_DRAWING })
  }

  /**
   * Finishes the current drawing if there are enough points
   */
  const handleFinishDrawing = () => {
    if (currentPolygon.length >= 3) {
      dispatch({ type: FINISH_DRAWING })
    }
  }

  /**
   * Cancels the current drawing and clears all points
   */
  const handleCancelDrawing = () => {
    dispatch({ type: CANCEL_DRAWING })
  }

  return (
    <DrawingControlsContainer>
      {!drawingMode ? (
        <Button onClick={handleStartDrawing} primary>
          Joonista kinnistu
        </Button>
      ) : (
        <>
          <Instructions>
            Klõpsa kaardil punkte lisama. Vähemalt 3 punkti on vajalikud
            kinnistu loomiseks.
            <br />
            Lisatud punkte: {currentPolygon.length}
          </Instructions>
          <div>
            <Button
              onClick={handleFinishDrawing}
              disabled={currentPolygon.length < 3}
              primary
            >
              Finish Drawing ({currentPolygon.length} points)
            </Button>
            <Button onClick={handleCancelDrawing} secondary>
              Cancel
            </Button>
          </div>
        </>
      )}
    </DrawingControlsContainer>
  )
}

export default DrawingControls
