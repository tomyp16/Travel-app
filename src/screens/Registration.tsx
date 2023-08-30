import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../component/Metrics';
import {RootScreenNavigationProps} from '../../type';
import axios from 'axios';
import ButtonTouch from '../component/ButtonTouch';
import ButtonTextInput from '../component/TextInput';
import ContainerModal from '../component/ContainerModal';

const Registration = ({route, navigation}: RootScreenNavigationProps) => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [ModalCondition, setModalCondition] = useState({
    Alert: false,
    TextAlert: '',
  });

  const _HandleRegistration = () => {
    if (!UserInfo.email || !UserInfo.password || !UserInfo.name) {
      setModalCondition({
        ...ModalCondition,
        Alert: true,
        TextAlert: 'The name, username and password fields cannot be empty!',
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
        url: `https://biroperjalanan.datacakra.com/api/authaccount/registration`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: UserInfo,
      };
      axios(config)
        .then(response => {
          if (response.data.message == 'success') {
            setModalCondition({
              ...ModalCondition,
              Alert: true,
              TextAlert: 'Successfully register',
            });

            setTimeout(() => {
              navigation.navigate('Login');

              setModalCondition({
                ...ModalCondition,
                Alert: false,
                TextAlert: '',
              });

              setTimeout(() => {
                setUserInfo({
                  email: '',
                  password: '',
                  name: '',
                });
              }, 2000);
            }, 3000);
          }
        })
        .catch(error => {
          setModalCondition({
            ...ModalCondition,
            Alert: true,
            TextAlert: 'Unsuccessful registration',
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
            label="Create"
            width={'100%'}
            onPress={() => _HandleRegistration()}
          />

          <ButtonTouch
            title={`Already have an account?`}
            label="Login"
            fontSize={normalize(12)}
            fontSizeTitle={normalize(12)}
            onPress={() => navigation.navigate('Login')}
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
