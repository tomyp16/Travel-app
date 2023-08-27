import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {normalize} from '../component/Metrics';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationProps} from '../../type';
import axios from 'axios';

const Registration = () => {
  const Navigation = useNavigation<RootScreenNavigationProps>();

  const [UserInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });

  const _HandleRegistration = () => {
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
      <View style={{padding: normalize(10)}}>
        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
          Login
        </Text>

        <Text style={styles.LabelText}>Name</Text>
        <TextInput
          placeholder="Insert your name"
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          onChangeText={newText =>
            setUserInfo({...UserInfo, name: newText})
          }></TextInput>

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

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => _HandleRegistration()}>
          <Text style={styles.LabelText}>Sing In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Navigation.navigate('Registration')}>
          <Text style={styles.LabelText}>Registrasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;

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
