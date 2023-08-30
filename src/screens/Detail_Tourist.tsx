import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Text} from 'react-native';
import {RootScreenNavigationProps} from '../../type';
import {normalize} from '../component/Metrics';
import ButtonTextInput from '../component/TextInput';
import ButtonTouch from '../component/ButtonTouch';
import {UserContext} from '../context/authContext';
import axios from 'axios';
import ContainerModal from '../component/ContainerModal';

const Detail_Tourist = ({route, navigation}: RootScreenNavigationProps) => {
  const {User} = useContext(UserContext);

  const [InfoTourist, setInfoTourist] = useState('');
  const [Condition, setCondition] = useState(1);

  const [ModalCondition, setModalCondition] = useState({
    Alert: false,
    TextAlert: '',
  });

  useEffect(() => {
    if (Condition == 1) {
      let config = {
        method: 'get',
        url: `https://biroperjalanan.datacakra.com/api/Tourist/${route.params.id}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${User.Token}`,
        },
      };
      axios(config)
        .then(response => {
          setInfoTourist(response.data);
          setCondition(0);
          route.params.change();
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [route.params, Condition]);

  const _HandleUpdateTourist = () => {
    if (
      !InfoTourist.tourist_name ||
      !InfoTourist.tourist_email ||
      !InfoTourist.tourist_location
    ) {
      setModalCondition({
        ...ModalCondition,
        Alert: true,
        TextAlert: 'The name, email and location fields cannot be empty!',
      });

      setTimeout(() => {
        setModalCondition({
          ...ModalCondition,
          Alert: false,
          TextAlert: '',
        });
      }, 3000);
    } else {
      let data = {
        tourist_email: InfoTourist.tourist_email,
        tourist_location: InfoTourist.tourist_location,
        tourist_name: InfoTourist.tourist_name,
      };

      let config = {
        method: 'put',
        url: `https://biroperjalanan.datacakra.com/api/Tourist/${InfoTourist.id_tourist}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${User.Token}`,
        },
        data: data,
      };
      axios(config)
        .then(response => {
          setCondition(1);
          setModalCondition({
            ...ModalCondition,
            Alert: true,
            TextAlert: 'Successfully update data',
          });

          setTimeout(() => {
            setModalCondition({
              ...ModalCondition,
              Alert: false,
              TextAlert: '',
            });
          }, 3000);
        })
        .catch(error => {
          setModalCondition({
            ...ModalCondition,
            Alert: true,
            TextAlert: 'Unsuccessful data update',
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
      <View style={{...styles.ContainerProfile, alignItems: 'center'}}>
        <View style={styles.ContainerImage}>
          {InfoTourist.tourist_profilepicture ? (
            <Image
              source={{
                uri: InfoTourist.tourist_profilepicture,
              }}
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          ) : (
            <ActivityIndicator size={'small'} color={'#118EEA'} />
          )}
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
          value={InfoTourist.tourist_name}
          onChangeText={newText =>
            setInfoTourist({...InfoTourist, tourist_name: newText})
          }
        />

        <ButtonTextInput
          placeholder="Location"
          placeholderTextColor={'grey'}
          borderBottomColor="#118EEA"
          value={InfoTourist.tourist_location}
          onChangeText={newText =>
            setInfoTourist({...InfoTourist, tourist_location: newText})
          }
        />

        <ButtonTextInput
          placeholder="Email"
          placeholderTextColor={'grey'}
          borderBottomColor="#118EEA"
          keyboardType="email-address"
          value={InfoTourist.tourist_email}
          onChangeText={newText =>
            setInfoTourist({...InfoTourist, tourist_email: newText})
          }
        />

        <View style={{paddingVertical: normalize(10)}}>
          <ButtonTouch
            label="Update tourist"
            width={'100%'}
            onPress={() => _HandleUpdateTourist()}
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

export default Detail_Tourist;

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
