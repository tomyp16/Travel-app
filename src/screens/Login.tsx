import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {normalize} from '../component/Metrics';
import {RootScreenNavigationProps} from '../../type';
import axios from 'axios';
import ButtonTouch from '../component/ButtonTouch';
import ButtonTextInput from '../component/TextInput';

const Login = ({route, navigation}: RootScreenNavigationProps) => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  //   const _HandleRegist = () => {
  //     navigation.navigate('Registration');
  //   };

  const _HandleLogin = () => {
    if (!UserInfo.email || !UserInfo.password) {
      console.log('kosong');
    } else {
      let config = {
        method: 'post',
        url: `https://biroperjalanan.datacakra.com/api/authaccount/login`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: UserInfo,
      };
      axios(config)
        .then(response => {
          if (response.data.message == 'success') {
            navigation.navigate('Home');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={{padding: normalize(10)}}>
        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
          Login
        </Text>

        <Text style={styles.LabelText}>email</Text>
        <TextInput
          placeholder="Insert your email"
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          onChangeText={newText =>
            setUserInfo({...UserInfo, email: newText})
          }></TextInput>

        <Text style={styles.LabelText}>password</Text>
        <TextInput
          placeholder="Insert your password"
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          secureTextEntry={true}
          onChangeText={newText =>
            setUserInfo({...UserInfo, password: newText})
          }></TextInput>

        <ButtonTextInput
          placeholder="Insert your password"
          placeholderTextColor={'grey'}
          label="Email"
          onChangeText={newText =>
            setUserInfo({...UserInfo, password: newText})
          }
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => _HandleLogin()}>
          <Text style={styles.LabelText}>Sing In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.LabelText}>Registrasi</Text>
        </TouchableOpacity>

        <ButtonTouch
          label="Login"
          onPress={() => console.log('sini')}
          padding={normalize(15)}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
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
});
