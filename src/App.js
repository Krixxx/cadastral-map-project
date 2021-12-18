//import components
import { SearchBar, MapView, AddressInfo, CadastralList } from './components';

//import Styled Components
import styled from 'styled-components';

//import createStore for redux
import { createStore } from 'redux';

//initial store
const initialStore = {
  search: '12345:003:0022',
};

//reducer
function reducer(state, action) {
  console.log({ state, action });
  return state;
}

//create redux STORE
const store = createStore(reducer, initialStore);

function App() {
  return (
    <>
      <SearchBar />
      <Main>
        <MapView />
        <SideBar>
          <AddressInfo />
          <CadastralList list={store.getState()} />
        </SideBar>
      </Main>
    </>
  );
}

const Main = styled.section`
  display: flex;
  justify-content: space-between;
`;

const SideBar = styled.section``;

export default App;
