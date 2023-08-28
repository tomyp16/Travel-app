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
      <View style={styles.ContainerForm}>
        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
          Login
        </Text>


        <View style={{paddingVertical:normalize(10)}}>
          <ButtonTextInput
            placeholder="Insert your email"
            placeholderTextColor={'grey'}
            // label="Email"
            borderBottomColor="#118EEA"
            onChangeText={newText =>
              setUserInfo({...UserInfo, email: newText})
            }
          />

          <ButtonTextInput
            placeholder="Insert your password"
            placeholderTextColor={'grey'}
            // label="Password"
            borderBottomColor="#118EEA"
            onChangeText={newText =>
              setUserInfo({...UserInfo, password: newText})
            }
          />
        </View>

       <View style={{paddingVertical:normalize(10)}}>
        <ButtonTouch
            label="Login"
            onPress={() => _HandleLogin()}/>

          <ButtonTouch
            label="Registration"
            onPress={() => navigation.navigate('Registration')}/>
       </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#118EEA'
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
  ContainerForm:{
    padding: normalize(15),
    backgroundColor:'#FFF',
    margin:normalize(40),
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 3,
  }
});
