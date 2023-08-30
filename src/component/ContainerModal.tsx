import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Modal} from 'react-native';
import {normalize} from './Metrics';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Value = {
  width: string;
  height: number;
  padding: number;
  alignItems: undefined;
  borderRadius: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: undefined;
  fontSize: number;
  color: string;
  fontWeightLabel: undefined;
  fontFamilyLabel: string;
  fontStyleLabel: undefined;
  fontWeightTitle: undefined;
  fontFamilyTitle: string;
  fontStyleTitle: undefined;
  fontSizeTitle: string;
  backgroundColor: string;
  justifyContent: undefined;
  onPress: undefined;
  label: string;
  margin: undefined;
  title: string;
  visible: boolean;
  unVisible: string;
  Body: undefined;
  justifyContentContainer: string;
  animation: string;
  unVisibleStatus: boolean;
  borderTopRightRadiusAnimation: number;
  borderTopLeftRadiusAnimation: number;
  borderBottomRightRadiusAnimation: number;
  borderBottomLeftRadiusAnimation: number;
  marginAnimation: number;
  backgroundColorAnimation: string;
  backgroundColorContainer: string;
  paddingVerticalAnimation: number;
  paddingHorizontalAnimation: number;
};

const ContainerModal = (props: Value) => {
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      flexDirection: props.title ? 'row' : 'column',
      justifyContent: props.justifyContentContainer || 'flex-end',
      backgroundColor: props.backgroundColorContainer || 'rgba(0,0,0,0.5)',
    },
    ContainerTouch: {
      width: '100%',
      height: props.height || null,
      backgroundColor: props.title
        ? 'transparent'
        : props.backgroundColor || '#118EEA',
      padding: props.title ? normalize(5) : props.padding || normalize(10),
      paddingVertical: props.title ? normalize(10) : props.padding,
      justifyContent: props.justifyContent || 'center',
      alignItems: props.alignItems || 'center',
      borderRadius: props.borderRadius || 100,
      shadowColor: props.shadowColor || '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: props.shadowOpacity || 0.5,
      shadowRadius: props.shadowRadius || 2,
      elevation: props.elevation || null,
      marginVertical: props.margin || normalize(5),
    },
    Label: {
      fontSize: props.fontSize || normalize(15),
      color: props.title ? '#000' : props.color || '#FFF',
      fontWeight: props.fontWeightLabel || 'bold',
      fontFamily: props.fontFamilyLabel || 'Roboto',
      fontStyle: props.fontStyleLabel || 'normal',
    },
    Title: {
      fontSize: props.fontSizeTitle || normalize(15),
      color: props.title ? '#000' : props.color || '#FFF',
      fontWeight: props.fontWeightTitle || '400',
      fontFamily: props.fontFamilyTitle || 'Roboto',
      fontStyle: props.fontStyleTitle || 'normal',
    },
    ContainerAnimation: {
      backgroundColor: props.backgroundColorAnimation || '#FFF',
      borderTopRightRadius: props.borderTopRightRadiusAnimation || 0,
      borderTopLeftRadius: props.borderTopLeftRadiusAnimation || 0,
      borderBottomRightRadius: props.borderBottomRightRadiusAnimation || 0,
      borderBottomLeftRadius: props.borderBottomLeftRadiusAnimation || 0,
      paddingVertical: props.paddingVerticalAnimation || 0,
      paddingHorizontal: props.paddingHorizontalAnimation || 0,
      margin: props.marginAnimation || 0,
    },
  });

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.Container}>
        <Animatable.View
          animation={props.animation || 'fadeInUp'}
          duration={2000}
          style={styles.ContainerAnimation}>
          {props.unVisibleStatus && (
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => props.unVisible()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign
                  size={normalize(23)}
                  color={'#C2BFBF'}
                  name="close"
                />
              </TouchableOpacity>
            </View>
          )}
          {props.Body}
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default ContainerModal;
