import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Providers from './navigation';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
const App = () => {
  return <Providers />;
}

export default App;
