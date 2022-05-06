import React from 'react'
import styles from './App.module.scss'
import Filters from '../../components/Filters'
import Flights from '../../containers/Flights'

function App() {
  return (
    <div className={styles.appWrapper}>
      <Filters/>
      <Flights/>
    </div>
  );
}

export default App;
