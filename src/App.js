import { Provider } from 'react-redux';
import store from './Redux/Store';
import Routing from './utils/Routing';

function App() {



  return (
    <Provider store={store}>
      <div className="App font-Poppins font-weight-500">
        <Routing />
      </div>
    </Provider>
  );
}

export default App;