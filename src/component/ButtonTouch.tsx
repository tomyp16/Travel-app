import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {normalize} from './Metrics';

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
  backgroundColor: string;
  justifyContent: undefined;
  onPress: undefined;
  label: string;
  margin: undefined;
  title: string;
};

const ButtonTouch = (props: Value) => {
  const styles = StyleSheet.create({
    Container: {
      width: '100%',
      flexDirection: props.title ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ContainerTouch: {
      width: props.width || null,
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
      fontSize: props.fontSize || normalize(15),
      color: props.title ? '#000' : props.color || '#FFF',
      fontWeight: props.fontWeightTitle || '400',
      fontFamily: props.fontFamilyTitle || 'Roboto',
      fontStyle: props.fontStyleTitle || 'normal',
    },
  });

  return (
    <View style={styles.Container}>
      {props.title && <Text style={styles.Title}>{props.title}</Text>}

      <TouchableOpacity style={styles.ContainerTouch} onPress={props.onPress}>
        <Text style={styles.Label}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonTouch;
