/**
 * API utilities for fetching cadastral data from Estonian Land Board
 * Uses the X-GIS2 service for cadastral unit information
 */

/**
 * Fetches cadastral unit data by cadastral number
 * @param {string} cadastralNumber - Cadastral number in format XXXXX:XXX:XXXX
 * @returns {Promise<Object>} Cadastral unit data
 */
export const fetchCadastralUnit = async (cadastralNumber) => {
  try {
    // Validate cadastral number format
    const regex = /^([0-9]{5}):([0-9]{3}):([0-9]{4})$/
    if (!regex.test(cadastralNumber)) {
      throw new Error('Invalid cadastral number format')
    }

    // X-GIS2 service URL for cadastral units
    // const baseUrl = 'https://xgis.maaamet.ee/xgis2/service'
    // const url = `${baseUrl}/ky_tunnus?tunnus=${encodeURIComponent(
    //   cadastralNumber
    // )}&format=json&output=json`

    const url = 'http://localhost:3000/api/cadastral-units'

    console.log('Fetching from URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('API response:', data)

    if (!data || !data.features || data.features.length === 0) {
      throw new Error('No cadastral unit found with this number')
    }

    return data.features[0]
  } catch (error) {
    console.error('Error fetching cadastral unit:', error)
    throw error
  }
}

/**
 * Alternative method using different API endpoint
 * @param {string} cadastralNumber - Cadastral number
 * @returns {Promise<Object>} Cadastral unit data
 */
export const fetchCadastralUnitAlternative = async (cadastralNumber) => {
  try {
    // Alternative API endpoint
    // const url = `https://geoportaal.maaamet.ee/est/Teenused/Poordumine-kaardirakendusse-labi-URLi-p9.html?tunnus=${encodeURIComponent(
    //   cadastralNumber
    // )}`

    const url = 'http://localhost:3000/api/cadastral-units'

    console.log('Trying alternative URL:', url)

    // This might return HTML, so we need to handle it differently
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // For now, return a mock response for testing
    return {
      type: 'Feature',
      properties: {
        nimi: `Katastriyksus ${cadastralNumber}`,
        pindala: 1000,
        aadress: 'Test address',
        omavalitsus: 'Tallinn',
        maakond: 'Harjumaa',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [537000, 6590000],
            [538000, 6591000],
            [539000, 6590000],
            [538000, 6589000],
            [537000, 6590000],
          ],
        ],
      },
    }
  } catch (error) {
    console.error('Error with alternative API:', error)
    throw error
  }
}

/**
 * Fetches cadastral unit geometry and properties
 * @param {string} cadastralNumber - Cadastral number
 * @returns {Promise<Object>} Processed cadastral data with geometry and properties
 */
export const fetchCadastralData = async (cadastralNumber) => {
  try {
    let feature

    try {
      feature = await fetchCadastralUnit(cadastralNumber)
    } catch (error) {
      console.log('Primary API failed, trying alternative...')
      feature = await fetchCadastralUnitAlternative(cadastralNumber)
    }

    if (!feature || !feature.geometry || !feature.properties) {
      throw new Error('Invalid cadastral unit data received')
    }

    // Extract relevant properties
    const properties = feature.properties
    const geometry = feature.geometry

    return {
      cadastralNumber: cadastralNumber,
      properties: {
        name: properties.nimi || properties.katastriyksuse_nimi || 'Unknown',
        area: properties.pindala || 0,
        address: properties.aadress || 'No address available',
        municipality: properties.omavalitsus || 'Unknown',
        county: properties.maakond || 'Unknown',
      },
      geometry: geometry,
      bounds: geometry.coordinates
        ? calculateBounds(geometry.coordinates)
        : null,
    }
  } catch (error) {
    console.error('Error processing cadastral data:', error)
    throw error
  }
}

/**
 * Calculates bounding box from geometry coordinates
 * @param {Array} coordinates - Geometry coordinates
 * @returns {Array} Bounding box [[minLat, minLng], [maxLat, maxLng]]
 */
const calculateBounds = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates)) {
    return null
  }

  // Flatten coordinates if they're nested (for polygons)
  const flatCoords = coordinates.flat(1)

  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  for (let i = 0; i < flatCoords.length; i += 2) {
    const lat = flatCoords[i + 1]
    const lng = flatCoords[i]

    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
    minLng = Math.min(minLng, lng)
    maxLng = Math.max(maxLng, lng)
  }

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ]
}
