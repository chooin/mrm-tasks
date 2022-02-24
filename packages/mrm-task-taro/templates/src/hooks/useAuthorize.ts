import { useState } from 'react';
import Taro from '@tarojs/taro';
import { useShow } from '@/hooks';
import config from '@/app.config';

type RequestResponse = Promise<void | { openSettings: () => void }>;
type State = boolean | null;
type Result = {
  state: State;
  request: () => RequestResponse;
};

export enum AuthorizeScopes {
  userLocation = 'scope.userLocation',
}

export function useAuthorize(scope: AuthorizeScopes): Result {
  const [state, setState] = useState<State>(null);

  useShow(() => {
    getSetting();
  });

  const getSetting = () => {
    Taro.getSetting().then(({ authSetting }) => {
      if (authSetting[scope]) {
        setState(true);
      } else {
        setState(false);
      }
    });
  };

  const openSettings = () => {
    Taro.showModal({
      content: config.permission[scope].desc,
      confirmColor: '#f5c223',
      confirmText: '确定',
      cancelText: '取消',
    }).then(async ({ confirm }) => {
      if (confirm) {
        await Taro.openSetting();
      }
    });
  };

  const request = (): RequestResponse => {
    return new Promise((resolve, reject) => {
      Taro.getSetting().then(({ authSetting }) => {
        if (authSetting[scope]) {
          resolve();
        } else {
          Taro.authorize({
            scope,
          })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject({ openSettings });
            });
        }
      });
    });
  };

  return {
    state,
    request,
  };
}
