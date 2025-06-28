/**
 * Coordinate transformation utilities for Estonian cadastral data
 * Converts L-EST coordinates to WGS84 for use with Leaflet maps
 */

/**
 * Transforms L-EST coordinates to WGS84 using more accurate parameters
 * Based on Estonian Land Board coordinate system (EPSG:3301)
 * @param {number} x - L-EST X coordinate
 * @param {number} y - L-EST Y coordinate
 * @returns {Array} [latitude, longitude] in WGS84 format
 */
export const transformLestToWgs84 = (x, y) => {
  // L-EST (EPSG:3301) to WGS84 (EPSG:4326) transformation
  // Using simplified transformation for Estonia

  // L-EST projection parameters
  const lat0 = (58.0 * Math.PI) / 180 // Central latitude
  const lon0 = (24.0 * Math.PI) / 180 // Central longitude
  const k0 = 1.0 // Scale factor
  const x0 = 500000 // False easting
  const y0 = 6375000 // False northing

  // WGS84 ellipsoid parameters
  const a = 6378137.0 // Semi-major axis
  const f = 1 / 298.257223563 // Flattening
  const e2 = 2 * f - f * f // First eccentricity squared

  // Convert from L-EST to WGS84
  const dx = x - x0
  const dy = y - y0

  // More accurate transformation
  const N0 = a / Math.sqrt(1 - e2 * Math.sin(lat0) * Math.sin(lat0))
  const M0 =
    a *
    ((1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256) * lat0 -
      ((3 * e2) / 8 + (3 * e2 * e2) / 32 + (45 * e2 * e2 * e2) / 1024) *
        Math.sin(2 * lat0) +
      ((15 * e2 * e2) / 256 + (45 * e2 * e2 * e2) / 1024) * Math.sin(4 * lat0) -
      ((35 * e2 * e2 * e2) / 3072) * Math.sin(6 * lat0))

  const lat = lat0 + dy / (N0 * k0)
  const lon = lon0 + dx / (N0 * k0 * Math.cos(lat0))

  return [
    (lat * 180) / Math.PI, // Convert to degrees
    (lon * 180) / Math.PI,
  ]
}

/**
 * Transforms a bounding box from L-EST to WGS84
 * @param {Array} bounds - [[minY, minX], [maxY, maxX]] in L-EST format
 * @returns {Array} [[minLat, minLng], [maxLat, maxLng]] in WGS84 format
 */
export const transformBounds = (bounds) => {
  if (!bounds || bounds.length !== 2) {
    return null
  }

  const [minPoint, maxPoint] = bounds
  const [minY, minX] = minPoint
  const [maxY, maxX] = maxPoint

  const minCoords = transformLestToWgs84(minX, minY)
  const maxCoords = transformLestToWgs84(maxX, maxY)

  return [minCoords, maxCoords]
}

/**
 * Transforms polygon coordinates from L-EST to WGS84
 * @param {Array} polygon - Array of [x, y] coordinates in L-EST format
 * @returns {Array} Array of [lat, lng] coordinates in WGS84 format
 */
export const transformPolygon = (polygon) => {
  if (!polygon || !Array.isArray(polygon)) {
    return null
  }

  return polygon.map((coord) => {
    const [x, y] = coord
    return transformLestToWgs84(x, y)
  })
}

/**
 * Alternative transformation using web service for more accuracy
 * Falls back to local transformation if service is unavailable
 * @param {number} x - L-EST X coordinate
 * @param {number} y - L-EST Y coordinate
 * @returns {Promise<Array>} [latitude, longitude] in WGS84 format
 */
export const transformLestToWgs84Web = async (x, y) => {
  try {
    // Try to use Estonian Land Board coordinate transformation service
    const url = `https://gpa.maaamet.ee/calc/geo-lest/url/convert.php?x=${x}&y=${y}&from=lest&to=wgs84`

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      if (data && data.lat && data.lon) {
        return [parseFloat(data.lat), parseFloat(data.lon)]
      }
    }
  } catch (error) {
    console.warn(
      'Web transformation failed, using local transformation:',
      error
    )
  }

  // Fallback to local transformation
  return transformLestToWgs84(x, y)
}
