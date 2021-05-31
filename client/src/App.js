import './App.css';
import {Fragment} from 'react';
import Inning from './components/Inning';
import {Provider} from 'react-redux'
import store from './store';  

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <h1 className='header'>
            Welcome to CricTracker
        </h1>
        <Inning/>
      </Fragment>
    </Provider>
  );
}

export default App;
