import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { pages } from './routes';

const RootStack = createStackNavigator();

const Routes: React.FC = () => {
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

export default Routes;
