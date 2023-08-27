import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Home: undefined;
};

export type RootScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  Login,
  Registration,
  Home
>;
