import { Provider } from 'react-redux';
import store from './Redux/Store';
import Routing from './utils/Routing';
import Snackbar from './utils/Snackbar';

function App() {



  return (
    <Provider store={store}>
      <div className="App font-Poppins font-weight-500">
        <Snackbar/>
        <Routing />
      </div>
    </Provider>
  );
}

export default App;