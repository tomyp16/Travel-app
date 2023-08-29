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
import IconFeather from 'react-native-vector-icons/Feather';

const Home = ({route, navigation}: RootScreenNavigationProps) => {
  const [DataTourist, setDataTourist] = useState([]);
  const [EditTourist, setEditTourist] = useState({
    tourist_email: '',
    tourist_location: '',
    tourist_name: '',
  });

  const [ParamsPagination, setParamsPagination] = useState('1');

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNjE5NGJiLTQzNDYtNDNiOC1hY2E3LTJkZjYzZmQ1NDczYiIsImVtYWlsIjoidG9teUBnbWFpbC5jb20iLCJuYW1lIjoidG9teSIsImlhdCI6MTY5MzMyMzIzMSwiZXhwIjoxNjkzNDA5NjMxfQ.RnJWLf0D_YaU4Tne-saaBD5viJVZdwj_Juv2tuNqedU';

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

  const [totalPages, setTotalpages] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (p: number) => setCurrentPage(p);
  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      if (endPage == i && endPage != totalPages) {
        buttons.push(
          <View
            key={i}
            style={{...styles.paginationContainer, paddingVertical: 0}}>
            <TouchableOpacity disabled={true} style={[styles.paginationButton]}>
              <Text style={{color: 'white'}}>...</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePageClick(i)}
              style={[
                styles.paginationButton,
                i === currentPage ? styles.activeButton : null,
              ]}>
              <Text style={{color: 'white'}}>{i}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePageClick(currentPage + 1)}
              style={[styles.paginationButton]}>
              <Text style={{color: 'white'}}>{'>'}</Text>
            </TouchableOpacity>
          </View>,
        );
      } else {
        if (startPage > 1 && startPage == i) {
          buttons.push(
            <View
              key={i}
              style={{...styles.paginationContainer, paddingVertical: 0}}>
              <TouchableOpacity
                onPress={() => handlePageClick(currentPage - 1)}
                style={[styles.paginationButton]}>
                <Text style={{color: 'white'}}>{'<'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handlePageClick(i)}
                style={[
                  styles.paginationButton,
                  i === currentPage ? styles.activeButton : null,
                ]}>
                <Text style={{color: 'white'}}>{i}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={true}
                style={[styles.paginationButton]}>
                <Text style={{color: 'white'}}>...</Text>
              </TouchableOpacity>
            </View>,
          );
        } else {
          buttons.push(
            <TouchableOpacity
              key={i}
              onPress={() => handlePageClick(i)}
              style={[
                styles.paginationButton,
                i === currentPage ? styles.activeButton : null,
              ]}>
              <Text style={{color: 'white'}}>{i}</Text>
            </TouchableOpacity>,
          );
        }
      }
    }

    return buttons;
  };

  const _RenderHeaderComponentn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#118EEA',
          padding: normalize(10),
        }}>
        <Text
          style={{
            ...styles.LabelText,
            flex: 1,
            textAlign: 'center',
            color: '#FFF',
          }}
          numberOfLines={1}>
          Name
        </Text>

        <Text
          style={{
            ...styles.LabelText,
            flex: 0.3,
            textAlign: 'center',
            color: '#FFF',
          }}
          numberOfLines={1}>
          Action
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          backgroundColor: '#FFF',
          alignItems: 'center',
          margin: normalize(15),
          marginTop: normalize(70),
          borderRadius: 10,
          elevation: 3,
          padding: normalize(10),
        }}>
        <View
          style={{
            height: normalize(80),
            width: normalize(80),
            backgroundColor: 'skyblue',
            borderRadius: 100,
            position: 'absolute',
            top: normalize(-35),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
            Foto profile
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: normalize(35),
          }}></View>

        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
          Your Name
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => _HandleCreateTourist()}
        style={{
          width: normalize(40),
          height: normalize(40),
          backgroundColor: '#118EEA',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: normalize(10),
          right: normalize(10),
        }}>
        <IconFeather name={'user-plus'} size={normalize(20)} color={'#FFF'} />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => _HandleFindTourist()}>
        <Text style={{...styles.LabelText}} numberOfLines={1}>
          Find Tourist
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => _HandleFindUser()}>
        <Text style={{...styles.LabelText}} numberOfLines={1}>
          Find User
        </Text>
      </TouchableOpacity> */}

      {_RenderHeaderComponentn()}

      <FlatList
        data={DataTourist}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          let background = index % 2;
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: normalize(5),
                backgroundColor: background ? '#f4fbff' : '#FFF',
                alignItems: 'center',
              }}>
              {/* <Text style={{...styles.LabelText}} numberOfLines={1}>
                  {index + 1}
                </Text> */}

              <Text
                style={{
                  ...styles.LabelText,
                  flex: 1,
                  fontWeight: '400',
                }}
                numberOfLines={1}>
                {item.tourist_name}
              </Text>

              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  margin: normalize(5),
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => _HandleEditTourist(item)}
                  style={{paddingHorizontal: normalize(5)}}>
                  <IconFeather
                    name={'edit'}
                    size={normalize(20)}
                    color={'#118EEA'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => _HandleDeleteTourist(item)}
                  style={{paddingHorizontal: normalize(5)}}>
                  <IconFeather
                    name={'trash-2'}
                    size={normalize(20)}
                    color={'#ED5E68'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.paginationContainer}>
            {renderPaginationButtons()}
          </View>
        )}
      />
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

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(8),
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(25),
    height: normalize(25),
    borderRadius: 5,
    marginHorizontal: normalize(4),
    backgroundColor: '#C2BFBF',
  },
  activeButton: {
    backgroundColor: '#118EEA',
  },
});
