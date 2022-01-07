export enum Keys {
  User = 'USER',
}

export const getItem = (key: Keys): any => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value).data;
    }

    return null;
  } catch {
    console.warn(`读取 window.localStorage 数据失败: ${key}`);
  }

  return null;
};

export const setItem = (key: Keys, value: any): void => {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
    }),
  );
};

export const removeItem = (key: Keys): void => {
  window.localStorage.removeItem(key);
};

export const clear = (): void => {
  window.localStorage.clear();
};
