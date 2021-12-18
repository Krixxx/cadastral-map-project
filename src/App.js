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

//initial store
const initialStore = {
  search: '12345:003:0022',
  cadastralList: [],
};

//create redux STORE
const store = createStore(reducer, initialStore);

function App() {
  return (
    <Provider store={store}>
      <SearchBar />
      <Main>
        <MapView />
        <section>
          <AddressInfo />
          <CadastralList />
        </section>
      </Main>
    </Provider>
  );
}

const Main = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default App;
