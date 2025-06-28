# Cadastral Map Application

A React application for searching and displaying Estonian cadastral units on an interactive map.

## Features

- **Cadastral Number Search**: Search for cadastral units using Estonian cadastral numbers (format: XXXXX:XXX:XXXX)
- **Interactive Map**: Display cadastral unit boundaries on a Leaflet map
- **Detailed Information**: View cadastral unit properties including area, address, and administrative information
- **Coordinate Transformation**: Automatic conversion from L-EST coordinates to WGS84 for map display
- **Error Handling**: Comprehensive error handling for invalid inputs and API failures

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cadastral-map-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Search for a Cadastral Unit**:

   - Enter a cadastral number in the format `XXXXX:XXX:XXXX` (e.g., `12345:123:1234`)
   - Click the "Search" button or press Enter

2. **View Results**:

   - The cadastral unit boundary will be displayed on the map as a red polygon
   - Detailed information will appear in the sidebar
   - The map will automatically zoom to the cadastral unit

3. **Map Interaction**:
   - Zoom in/out using mouse wheel or zoom controls
   - Pan the map by dragging
   - Hover over the cadastral unit to see a tooltip with basic information

## Technical Details

### Architecture

- **Frontend**: React with Redux for state management
- **Map**: Leaflet with react-leaflet
- **Styling**: Styled-components
- **Build Tool**: Vite

### Key Components

- `SearchBar`: Handles cadastral number input and validation
- `MapView`: Displays the interactive map with cadastral boundaries
- `AddressInfo`: Shows detailed cadastral unit information
- `CadastralList`: Lists previously searched cadastral numbers

### API Integration

The application integrates with the Estonian Land Board (Maaamet) X-GIS2 service to fetch cadastral data:

- **Primary API**: `https://xgis.maaamet.ee/xgis2/service/ky_tunnus`
- **Fallback**: Mock data for testing when API is unavailable

### Coordinate Transformation

The application includes utilities to transform coordinates from the Estonian L-EST coordinate system (EPSG:3301) to WGS84 (EPSG:4326) for map display.

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── AddressInfo/    # Cadastral unit information display
│   ├── CadastralList/  # List of searched cadastral numbers
│   ├── MapView/        # Interactive map component
│   └── SearchBar/      # Search input component
├── reducers/           # Redux reducers
├── utils/              # Utility functions
│   ├── actions.js      # Redux action types
│   ├── cadastralApi.js # API integration
│   └── coordinateTransform.js # Coordinate transformation
└── App.jsx             # Main application component
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run tests

## Troubleshooting

### Common Issues

1. **CORS Errors**: The application may encounter CORS issues when accessing the Estonian Land Board API. The app includes fallback mechanisms for this.

2. **Invalid Cadastral Numbers**: Ensure the cadastral number follows the format `XXXXX:XXX:XXXX`.

3. **Map Not Loading**: Check your internet connection and ensure the application can access OpenStreetMap tiles.

### Error Messages

- "Katastri number pole korrektne": Invalid cadastral number format
- "Viga katastriandmete laadimisel": Error loading cadastral data
- "No cadastral unit found": The cadastral number doesn't exist in the database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Estonian Land Board (Maaamet) for providing the cadastral data API
- OpenStreetMap for map tiles
- Leaflet for the mapping library
