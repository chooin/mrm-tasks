import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {pages} from './routes';

const RootStack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {pages.map((page, index) => (
          <RootStack.Screen key={index} {...page} />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
