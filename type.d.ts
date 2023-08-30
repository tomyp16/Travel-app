import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Home: undefined;
  Profile: undefined;
  Detail_Tourist: undefined;
};

export type RootScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  Login,
  Registration,
  Home,
  Profile,
  Detail_Tourist
>;
