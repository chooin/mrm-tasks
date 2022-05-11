import React from 'react';
import { View, Pressable, Text } from 'react-native';
import {
  useAppActive,
  useAppInactive,
  useMount,
  useShow,
  useHide,
  useUnmount,
  useResize,
} from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';

const Index: React.FC = () => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('/user/index');
  };

  // Called when the application from background to foreground
  useAppActive(() => {
    console.log('Home useAppActive');
  });

  // Called when the application from foreground to background
  useAppInactive(() => {
    console.log('Home useAppInactive');
  });

  // Called when the page load
  useMount(() => {
    console.log('Home useMount');
  });

  // Called when the page is displayed or in the application from background to foreground
  useShow(() => {
    console.log('Home useShow');
  });

  // Called when the page is hidden or in the application from foreground to background
  useHide(() => {
    console.log('Home useHide');
  });

  // Called when the page is unloaded
  useUnmount(() => {
    console.log('Home useUnmount');
  });

  // Called after the page window resize
  useResize(() => {
    console.log('Home useResize');
  });

  return (
    <View>
      <Pressable onPress={onClick}>
        <Text>home/index</Text>
      </Pressable>
    </View>
  );
};

export default Index;
