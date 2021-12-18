//import components
import { SearchBar, MapView, AddressInfo, CadastralList } from './components';

//import Styled Components
import styled from 'styled-components';

//import reducer
import reducer from './reducers/reducer';

//import createStore for redux
import { createStore } from 'redux';

//import react-redux Provider
import { Provider } from 'react-redux';

//create redux STORE
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <section className='section-center'>
        <SearchBar />
        <Main>
          <MapView />
          <section>
            <AddressInfo />
            <CadastralList />
          </section>
        </Main>
      </section>
    </Provider>
  );
}

const Main = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default App;
