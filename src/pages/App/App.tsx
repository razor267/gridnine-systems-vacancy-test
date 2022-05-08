import React from 'react'
import styles from './App.module.scss'
import Filters from '../../components/Filters'
import Flights from '../../containers/Flights'
import {store} from '../../redux/store'
import {Provider} from 'react-redux'

function App() {
  return (
      <Provider store={store}>
          <div className={styles.appWrapper}>
              <Filters/>
              <Flights/>
          </div>
      </Provider>
  );
}

export default App;
