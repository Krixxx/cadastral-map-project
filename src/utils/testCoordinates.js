/**
 * Test file for coordinate transformation functions
 * Run this to verify the transformation works correctly
 */

import { transformLestToWgs84, transformPolygon } from './coordinateTransform'

// Test coordinates (example L-EST coordinates for Tallinn area)
const testCoordinates = [
  [537000, 6590000], // Example L-EST coordinates
  [538000, 6591000],
  [539000, 6590000],
  [538000, 6589000],
  [537000, 6590000], // Close the polygon
]

console.log('Testing coordinate transformation...')

// Test single coordinate transformation
const singleTest = transformLestToWgs84(537000, 6590000)
console.log('Single coordinate test:', singleTest)

// Test polygon transformation
const polygonTest = transformPolygon(testCoordinates)
console.log('Polygon transformation test:', polygonTest)

// Expected results should be approximately:
// Single: [~59.43, ~24.75] (Tallinn area)
// Polygon: Array of [lat, lng] coordinates

export { testCoordinates }
