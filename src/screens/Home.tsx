import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {normalize} from '../component/Metrics';
import axios from 'axios';
import {RootScreenNavigationProps} from '../../type';
import IconFeather from 'react-native-vector-icons/Feather';
import ContainerModal from '../component/ContainerModal';
import ButtonTextInput from '../component/TextInput';
import ButtonTouch from '../component/ButtonTouch';
import { UserContext } from '../context/authContext';


const Home = ({route, navigation}: RootScreenNavigationProps) => {
  const {_Logout, User} = useContext(UserContext)
  
  const [UserInfo, setUserInfo] = useState('');
  const [DataTourist, setDataTourist] = useState([]);
  const [InfoTourist, setInfoTourist] = useState({
    id_tourist:'',
    tourist_email: '',
    tourist_location: '',
    tourist_name: '',
  });

  const [ModalCondition,setModalCondition]=useState({
    CreateTourist:false,
    EditTourist:false
  })
  const [isLoading,setisLoading]=useState(true)

  const [Condition,setCondition]=useState(1)

  const [totalPages, setTotalpages] = useState(203);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (Condition==1 && User) {
      let config = {
        method: 'get',
        url: `https://biroperjalanan.datacakra.com/api/Tourist?page=${currentPage}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${User.Token}`,
        },
      };
      axios(config)
        .then(response => {
          setDataTourist(response.data.data);
          setCondition(0)

          _HandleFindUser()
        })
        .catch(error => {
          console.log('error', error);
        });
    }

    if (User) {
      setTimeout(() => {
        setisLoading(false)
      }, 2000);
    }
  }, [Condition,User]);

  const _HandleFindUser = () => {
    let data = {
      email: User.Email,
      password: route.params,
    };

    let config = {
      method: 'get',
      url: `https://biroperjalanan.datacakra.com/api/users/${User.Id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${User.Token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(error => {
        console.log('error get user', error);
      });
  };

  const _HandleUpdateTourist = () => {
    if (!InfoTourist.tourist_name || !InfoTourist.tourist_email||!InfoTourist.tourist_location) {
      console.log('kosong');
    }else{
      let data ={
        tourist_email: InfoTourist.tourist_email,
        tourist_location: InfoTourist.tourist_location,
        tourist_name: InfoTourist.tourist_name,
      }

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
          setCondition(1)
          setModalCondition({
            ...ModalCondition,
            EditTourist: false,
          })

          setTimeout(() => {
            _HandleEmpty()
          }, 2000);
        })
        .catch(error => {
          console.log('error', error);
        });
    }

  };

  const _HandleDeleteTourist = item => {
    let data ={
      tourist_email: item.tourist_email,
      tourist_location: item.tourist_location,
      tourist_name: item.tourist_name,
    }

    let config = {
      method: 'delete',
      url: `https://biroperjalanan.datacakra.com/api/Tourist/${item.id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${User.Token}`,
      },
      data: data,
    };
    axios(config)
      .then(response => {
        setCondition(1)
        
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const _HandleCreateTourist = () => {
    if (!InfoTourist.tourist_name || !InfoTourist.tourist_email||!InfoTourist.tourist_location) {
      console.log('kosong');
    }else{
      let data ={
        tourist_email: InfoTourist.tourist_email,
        tourist_location: InfoTourist.tourist_location,
        tourist_name: InfoTourist.tourist_name,
      }
      
      let config = {
        method: 'post',
        url: `https://biroperjalanan.datacakra.com/api/Tourist`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${User.Token}`,
        },
        data: data,
      };
      axios(config)
        .then(response => {
          setCondition(1)
          setModalCondition({
            ...ModalCondition,
            CreateTourist: false,
          })

          setTimeout(() => {
            _HandleEmpty()
          }, 2000);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };
  
  const _HandleFindTourist = (Value) => {
    let config = {
      method: 'get',
      url: `https://biroperjalanan.datacakra.com/api/Tourist/${Value}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${User.Token}`,
      },
    };
    axios(config)
      .then(response => {
        setInfoTourist({
          id_tourist:response.data.id,
          tourist_email: response.data.tourist_email,
          tourist_location: response.data.tourist_location,
          tourist_name: response.data.tourist_name,
        })

        setModalCondition({
          ...ModalCondition,
          EditTourist: true,
        })
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  

  const handlePageClick = (p: number) => setCurrentPage(p);
  const renderPaginationButtons = () => {
    const maxButtonsToShow = 3;
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
              onPress={() => {handlePageClick(i)
                setCondition(1)
              }}
              style={[
                styles.paginationButton,
                i === currentPage ? styles.activeButton : null,
              ]}>
              <Text style={{color: 'white'}}>{i}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {handlePageClick(currentPage + 1)
                setCondition(1)
              }}
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
                onPress={() => {handlePageClick(currentPage - 1)
                  setCondition(1)
                }}
                style={[styles.paginationButton]}>
                <Text style={{color: 'white'}}>{'<'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {handlePageClick(i)
                  setCondition(1)                
                }}
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
              onPress={() => {handlePageClick(i)
                setCondition(1)             
              }}
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

  const _HandleEmpty=()=>{
    setInfoTourist({
      id_tourist:'',
      tourist_email: '',
      tourist_location: '',
      tourist_name: '',
    })
  };

  return (
    <View style={styles.MainContainer}>
      <ImageBackground
        style={{width: '100%', }}
        resizeMode="stretch"
        source={require('../assets/background.jpg')}>
      <View
        style={styles.ContainerProfile}>
        <View
          style={styles.ContainerImage}>
         {!isLoading &&
         <Image
         source={{
           uri: UserInfo.avatar,
         }}
         style={{width:'100%', height:'100%',
         borderRadius: 100,
         }}/> }
        </View>

        <View
          style={{
            width: '100%',
            height: normalize(50),
          }}></View>
      {!isLoading&&
        <Text style={{...styles.LabelText, fontSize: normalize(20)}}>
          {UserInfo.name}
        </Text>
      }

      {isLoading&& <ActivityIndicator size={'small'} color={'#118EEA'}/>}
      </View>
      </ImageBackground>

     

      {/* <TouchableOpacity onPress={() => _Logout('Logout')}>
        <Text style={{...styles.LabelText}} numberOfLines={1}>
          Logout
        </Text>
      </TouchableOpacity> */}

      {_RenderHeaderComponentn()}

      <View style={{flex:1, backgroundColor:'#FFF'}}>
        <FlatList
          data={DataTourist}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            let background = index % 2;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  padding: normalize(10),
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
                    onPress={() => _HandleFindTourist(item.id)}
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
          // ListFooterComponent={() => (
          //   <View style={styles.paginationContainer}>
          //     {renderPaginationButtons()}
          //   </View>
          // )}
        />

        <View style={styles.paginationContainer}>
          {renderPaginationButtons()}
        </View>

        <TouchableOpacity
          
          onPress={() =>
            setModalCondition({
              ...ModalCondition,
              CreateTourist: true,
            })
          }
          style={{
            width: normalize(40),
            height: normalize(40),
            backgroundColor: '#118EEA',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: normalize(8),
            right: normalize(8),
          }}>
          <IconFeather name={'user-plus'} size={normalize(20)} color={'#FFF'} />
        </TouchableOpacity>

        <ContainerModal
         visible={ModalCondition.CreateTourist}
         unVisible={()=>
        {  setModalCondition({
            ...ModalCondition,
            CreateTourist: false,
          })
          _HandleEmpty()
        }
        }
         Body={
          <View>
            <ButtonTextInput
              placeholder="Name"
              placeholderTextColor={'grey'}
              borderBottomColor="#118EEA"
              onChangeText={newText =>
                setInfoTourist({...InfoTourist, tourist_name: newText})
              }
            />

            <ButtonTextInput
              placeholder="Location"
              placeholderTextColor={'grey'}
              borderBottomColor="#118EEA"
              onChangeText={newText =>
                setInfoTourist({...InfoTourist, tourist_location: newText})
              }
            />

            <ButtonTextInput
              placeholder="Email"
              placeholderTextColor={'grey'}
              borderBottomColor="#118EEA"
              keyboardType="email-address"
              onChangeText={newText =>
                setInfoTourist({...InfoTourist, tourist_email: newText})
              }
            />

            <ButtonTouch
              label="Create Tourist"
              width={'100%'}
              onPress={() => _HandleCreateTourist()}
            />
          </View>
         }/>

        <ContainerModal
         visible={ModalCondition.EditTourist}
         unVisible={()=>{

           setModalCondition({
             ...ModalCondition,
             EditTourist: false,
           });
           _HandleEmpty()
         }
        }
         Body={
          <View>
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

          <ButtonTouch
            label="Update Tourist"
            width={'100%'}
            onPress={() => _HandleUpdateTourist()}
          />
          </View>
         }/>
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
  ContainerProfile:{
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: normalize(15),
    marginTop: normalize(70),
    borderRadius: 10,
    elevation: 3,
    padding: normalize(10),
    shadowColor:  '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity:  0.5,
    shadowRadius:  2,
    elevation: 3,
  },
  ContainerImage:{
    height: normalize(80),
            width: normalize(80),
            position: 'absolute',
            top: normalize(-25),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#FFF',
            borderRadius: 100,
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
