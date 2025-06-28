//import components
import {
  MapView,
  DrawingControls,
  CadastralAreaForm,
  SavedAreasList,
  MapLayerSwitcher,
} from './components'

//import Styled Components
import styled from 'styled-components'

//import reducer
import reducer from './reducers/reducer'

//import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

//import react-redux Provider
import { Provider } from 'react-redux'

//create redux STORE with Redux Toolkit
const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

function App() {
  return (
    <Provider store={store}>
      <Main>
        <MapContainer>
          <MapView />
          <MapLayerSwitcher />
          <CadastralAreaForm />
        </MapContainer>
        <Sidebar>
          <DrawingControls />
          <SavedAreasList />
        </Sidebar>
      </Main>
    </Provider>
  )
}

const Main = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`

const MapContainer = styled.div`
  position: relative;
  flex: 1;
`

const Sidebar = styled.section`
  width: 350px;
  background: #f8f9fa;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  height: 100%;
`

export default App
