import { Provider } from 'react-redux';
import store from './Redux/Store';
import Routing from './utils/Routing';
import Snackbar from './utils/Snackbar';
import NotificationAlert from './utils/NotificationAlert';

function App() {



  return (
    <Provider store={store}>
      <div className="App font-Poppins font-weight-500">
        <Snackbar/>
        <NotificationAlert />
        <Routing />
      </div>
    </Provider>
  );
}

export default App;