import React, {useContext, useState} from 'react';
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
import {UserContext} from '../context/authContext';
import ContainerModal from '../component/ContainerModal';

const Login = ({route, navigation}: RootScreenNavigationProps) => {
  const {_Login, User} = useContext(UserContext);

  const [UserInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [ModalCondition, setModalCondition] = useState({
    Alert: false,
    TextAlert: '',
  });

  const _HandleLogin = () => {
    if (!UserInfo.email || !UserInfo.password) {
      setModalCondition({
        ...ModalCondition,
        Alert: true,
        TextAlert: 'The username and password fields cannot be empty!',
      });

      setTimeout(() => {
        setModalCondition({
          ...ModalCondition,
          Alert: false,
          TextAlert: '',
        });
      }, 3000);
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
            _Login(response.data.data);
            setModalCondition({
              ...ModalCondition,
              Alert: true,
              TextAlert: 'Login successful',
            });

            setTimeout(() => {
              navigation.navigate('Home', UserInfo.password);

              setModalCondition({
                ...ModalCondition,
                Alert: false,
                TextAlert: '',
              });

              setTimeout(() => {
                setUserInfo({
                  email: '',
                  password: '',
                });
              }, 2000);
            }, 3000);
          }
        })
        .catch(error => {
          setModalCondition({
            ...ModalCondition,
            Alert: true,
            TextAlert: 'Login not successful',
          });

          setTimeout(() => {
            setModalCondition({
              ...ModalCondition,
              Alert: false,
              TextAlert: '',
            });
          }, 3000);
        });
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ContainerForm}>
        <Text
          style={{
            ...styles.LabelText,
            fontSize: normalize(20),
            textAlign: 'center',
          }}>
          Login Account
        </Text>

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTextInput
            placeholder="Email"
            placeholderTextColor={'grey'}
            // label="Email"
            borderBottomColor="#118EEA"
            keyboardType="email-address"
            value={UserInfo.email}
            onChangeText={newText => setUserInfo({...UserInfo, email: newText})}
          />

          <ButtonTextInput
            placeholder="Password"
            placeholderTextColor={'grey'}
            // label="Password"
            borderBottomColor="#118EEA"
            type="password"
            value={UserInfo.password}
            onChangeText={newText =>
              setUserInfo({...UserInfo, password: newText})
            }
          />
        </View>

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTouch
            label="Login"
            width={'100%'}
            onPress={() => _HandleLogin()}
          />

          <ButtonTouch
            title={`Don't have an account?`}
            label="Register"
            fontSize={normalize(12)}
            fontSizeTitle={normalize(12)}
            onPress={() => {
                navigation.navigate('Registration');
                setUserInfo({
                  email: '',
                  password: '',
                });
              }
            }
          />
        </View>
      </View>

      <ContainerModal
        visible={ModalCondition.Alert}
        justifyContentContainer="flex-start"
        animation="fadeInDown"
        backgroundColorAnimation="transparent"
        backgroundColorContainer="transparent"
        unVisibleStatus={false}
        paddingVerticalAnimation={normalize(10)}
        Body={
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 100,
                padding: normalize(5),
              }}>
              <Text
                style={{
                  ...styles.LabelText,
                  color: '#FFF',
                }}>
                {ModalCondition.TextAlert}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default Login;

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
