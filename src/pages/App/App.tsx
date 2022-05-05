import React from 'react'
import styles from './App.module.scss'
import Filters from '../../components/Filters'

function App() {
  return (
    <div className={styles.appWrapper}>
      <Filters/>
      <div className={styles.flightWrapper}>Перелёты</div>
    </div>
  );
}

export default App;
