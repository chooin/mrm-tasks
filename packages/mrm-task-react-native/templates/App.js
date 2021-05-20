/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from '@ant-design/react-native';
import Routes from './src/routes';

export default () => {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
};
