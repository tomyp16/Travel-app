import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {normalize} from '../component/Metrics';
import axios from 'axios';
import {RootScreenNavigationProps} from '../../type';

const Home = ({route, navigation}: RootScreenNavigationProps) => {
  const [DataTourist, setDataTourist] = useState([]);
  const [EditTourist, setEditTourist] = useState({
    tourist_email: '',
    tourist_location: '',
    tourist_name: '',
  });

  const [ParamsPagination, setParamsPagination] = useState('1');

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNjE5NGJiLTQzNDYtNDNiOC1hY2E3LTJkZjYzZmQ1NDczYiIsImVtYWlsIjoidG9teUBnbWFpbC5jb20iLCJuYW1lIjoidG9teSIsImlhdCI6MTY5MzEzOTI2MywiZXhwIjoxNjkzMjI1NjYzfQ.kI9_ZQbfP9uSpuUkGuMNx8c5TIojzEyFSEDu7OOhIek';

  useEffect(() => {
    let config = {
      method: 'get',
      url: `https://biroperjalanan.datacakra.com/api/Tourist?page=${ParamsPagination}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(response => {
        setDataTourist(response.data.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const _HandleFindUser = () => {
    let data = {
      email: 'tomy@gmail.com',
      password: 'hahahihi',
    };

    let config = {
      method: 'get',
      url: `https://biroperjalanan.datacakra.com/api/users/${'2b6194bb-4346-43b8-aca7-2df63fd5473b'}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        console.log('res', response.data);
      })
      .catch(error => {
        console.log('error get user', error);
      });
  };

  const _HandleEditTourist = item => {
    let data = {
      tourist_email: 'tomy@gmail.com',
      tourist_location: 'Indonesia',
      tourist_name: 'Tomy',
    };

    let config = {
      method: 'put',
      url: `https://biroperjalanan.datacakra.com/api/Tourist/${item.id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        // setDataTourist(response.data.data);
        console.log('res', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const _HandleDeleteTourist = item => {
    let data = {
      tourist_email: 'tomy@gmail.com',
      tourist_location: 'Indonesia',
      tourist_name: 'Tomy',
    };

    let config = {
      method: 'delete',
      url: `https://biroperjalanan.datacakra.com/api/Tourist/${item.id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        // setDataTourist(response.data.data);
        console.log('res', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const _HandleCreateTourist = () => {
    let data = {
      tourist_email: 'tomy@gmail.com',
      tourist_location: 'Indonesia',
      tourist_name: 'Tomy',
    };

    let config = {
      method: 'post',
      url: `https://biroperjalanan.datacakra.com/api/Tourist`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        // setDataTourist(response.data.data);
        console.log('res', response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const _HandleFindTourist = () => {
    let config = {
      method: 'get',
      url: `https://biroperjalanan.datacakra.com/api/Tourist/${'2b6194bb-4346-43b8-aca7-2df63fd5473b'}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(response => {
        // setDataTourist(response.data.data);
        console.log('res', response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <View style={styles.MainContainer}>
      <View style={{padding: normalize(10)}}>
        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>Home</Text>

        <TouchableOpacity onPress={() => _HandleCreateTourist()}>
          <Text style={{...styles.LabelText}} numberOfLines={1}>
            Create
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => _HandleFindTourist()}>
          <Text style={{...styles.LabelText}} numberOfLines={1}>
            Find Tourist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => _HandleFindUser()}>
          <Text style={{...styles.LabelText}} numberOfLines={1}>
            Find User
          </Text>
        </TouchableOpacity>
        <FlatList
          data={DataTourist}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.LabelText}} numberOfLines={1}>
                  {index + 1}
                </Text>

                <Text style={{...styles.LabelText}} numberOfLines={1}>
                  {item.tourist_name}
                </Text>

                <TouchableOpacity onPress={() => _HandleEditTourist(item)}>
                  <Text style={{...styles.LabelText}} numberOfLines={1}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => _HandleDeleteTourist(item)}>
                  <Text style={{...styles.LabelText}} numberOfLines={1}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // justifyContent: 'center',
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
