import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
