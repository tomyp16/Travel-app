import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../type';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Home from '../screens/Home';
import {UserContext} from '../context/authContext';
import {ActivityIndicator, View} from 'react-native';
import Profile from '../screens/Profile';
import Detail_Tourist from '../screens/Detail_Tourist';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Route = () => {
  const {Route} = useContext(UserContext);

  if (!Route.name) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#118EEA'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Route.name}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="Detail_Tourist"
          component={Detail_Tourist}
          options={{title: 'Detail tourist'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
