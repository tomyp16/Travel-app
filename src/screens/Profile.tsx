import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {RootScreenNavigationProps} from '../../type';
import {normalize} from '../component/Metrics';
import ButtonTextInput from '../component/TextInput';
import ButtonTouch from '../component/ButtonTouch';
import {UserContext} from '../context/authContext';

const Profile = ({route, navigation}: RootScreenNavigationProps) => {
  const {_Logout} = useContext(UserContext);

  const [UserInfo, setUserInfo] = useState(route.params);

  return (
    <View style={styles.MainContainer}>
      <View style={{...styles.ContainerProfile, alignItems: 'center'}}>
        <View style={styles.ContainerImage}>
          <Image
            source={{
              uri: UserInfo.avatar,
            }}
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
        </View>
      </View>

      <View
        style={{
          ...styles.ContainerProfile,
          margin: normalize(15),
        }}>
        <ButtonTextInput
          placeholder="Name"
          placeholderTextColor={'grey'}
          borderBottomColor="#118EEA"
          editable={false}
          value={UserInfo.name}
          // onChangeText={newText =>
          //   setInfoTourist({...InfoTourist, tourist_email: newText})
          // }
        />

        <ButtonTextInput
          placeholder="Email"
          placeholderTextColor={'grey'}
          borderBottomColor="#118EEA"
          keyboardType="email-address"
          editable={false}
          value={UserInfo.email}
          // onChangeText={newText =>
          //   setInfoTourist({...InfoTourist, tourist_email: newText})
          // }
        />

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTouch
            label="Update profile"
            width={'100%'}
            onPress={() => null}
          />

          <ButtonTouch
            label="Logout"
            width={'100%'}
            onPress={() => _Logout() + navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingVertical: normalize(10),
    backgroundColor: '#FFF',
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
  ContainerProfile: {
    padding: normalize(10),
  },
  ContainerImage: {
    height: normalize(80),
    width: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
  },
});
