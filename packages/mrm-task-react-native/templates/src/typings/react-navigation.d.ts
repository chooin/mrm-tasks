import { ParamListBase, NavigationProp } from "@react-navigation/native";

interface MergeNavigation extends NavigationProp<ParamListBase> {
  replace: (name: string, params?: object) => void;
  push: (name: string, params?: object) => void;
  pop: () => void;
  popToTop: () => void;
  jumpTo: (name: string) => void;
}

export interface Navigation {
  navigation: MergeNavigation;
  [k: string]: any;
}

export interface Route<T> {
  route: {
    key: string;
    name: string;
    params: T;
  };
  [k: string]: any;
}

export interface Page<T> extends Navigation, Route<T> {
  [k: string]: any;
}

export interface Page<T = undefined> extends Navigation {}
