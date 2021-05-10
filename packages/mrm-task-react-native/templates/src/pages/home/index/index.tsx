import React from 'react';
import {
  useAppActive,
  useAppInactive,
  useLoad,
  useShow,
  useHide,
  useUnload,
  useResize,
} from 'react-native-lifecycle';
import {useNavigation} from '@react-navigation/native';
import {Page, Pressable, Text} from './styled';

export default () => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('/user/index');
  };

  // Called when the application from background to foreground
  useAppActive(() => {
    console.log('useAppActive');
  });

  // Called when the application from foreground to background
  useAppInactive(() => {
    console.log('useAppInactive');
  });

  // Called when the page load
  useLoad(() => {
    console.log('useLoad');
  });

  // Called when the page is displayed or in the application from background to foreground
  useShow(() => {
    console.log('useShow');
  });

  // Called when the page is hidden or in the application from foreground to background
  useHide(() => {
    console.log('useHide');
  });

  // Called when the page is unloaded
  useUnload(() => {
    console.log('useUnload');
  });

  // Called after the page window resize
  useResize(() => {
    console.log('useResize');
  });

  return (
    <Page>
      <Pressable onPress={onClick}>
        <Text>home/index</Text>
      </Pressable>
    </Page>
  );
};
