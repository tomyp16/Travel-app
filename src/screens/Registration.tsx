import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../component/Metrics';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationProps} from '../../type';
import axios from 'axios';
import ButtonTouch from '../component/ButtonTouch';
import ButtonTextInput from '../component/TextInput';

const Registration = ({route, navigation}: RootScreenNavigationProps) => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });

  const _HandleRegistration = () => {
    console.log(UserInfo);
    if (!UserInfo.email || !UserInfo.password || !UserInfo.name) {
      console.log('kosong');
    } else {
      let config = {
        method: 'post',
        url: `https://biroperjalanan.datacakra.com/api/authaccount/registration`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: UserInfo,
      };
      axios(config)
        .then(response => {
          if (response.data.message == 'success') {
            Navigation.navigate('Home');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ContainerForm}>
        <Text
          style={{
            ...styles.LabelText,
            fontSize: normalize(25),
            textAlign: 'center',
          }}>
          Create Account
        </Text>

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTextInput
            placeholder="Name"
            placeholderTextColor={'grey'}
            // label="Email"
            borderBottomColor="#118EEA"
            onChangeText={newText => setUserInfo({...UserInfo, name: newText})}
          />

          <ButtonTextInput
            placeholder="Email"
            placeholderTextColor={'grey'}
            // label="Email"
            borderBottomColor="#118EEA"
            keyboardType="email-address"
            onChangeText={newText => setUserInfo({...UserInfo, email: newText})}
          />

          <ButtonTextInput
            placeholder="Password"
            placeholderTextColor={'grey'}
            // label="Password"
            borderBottomColor="#118EEA"
            type="password"
            onChangeText={newText =>
              setUserInfo({...UserInfo, password: newText})
            }
          />
        </View>

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTouch
            label="Create Account"
            width={'100%'}
            onPress={() => _HandleRegistration()}
          />

          <ButtonTouch
            title={`Already have an account?`}
            label="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#118EEA',
  },
  LabelText: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    margin: normalize(5),
    color: '#000',
  },
  textInputStyle: {
    fontSize: normalize(15),
    color: '#FFF',
    backgroundColor: '#181934',
    borderRadius: 5,
    paddingHorizontal: normalize(10),
    fontWeight: '400',
    fontStyle: 'normal',
    margin: normalize(5),
  },
  buttonStyle: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
    borderRadius: normalize(20),
    margin: normalize(5),
  },
  ContainerForm: {
    padding: normalize(15),
    backgroundColor: '#FFF',
    margin: normalize(40),
    borderRadius: 20,
  },
});
