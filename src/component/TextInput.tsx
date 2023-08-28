import React, { useState } from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {normalize} from './Metrics';

type Value = {
  width: undefined;
  height: undefined;
  paddingHorizontal: undefined;
  alignItems: undefined;
  borderRadius: undefined;
  shadowColor: undefined;
  shadowOpacity: undefined;
  shadowRadius: undefined;
  elevation: undefined;
  fontSize: undefined;
  color: undefined;
  fontWeight: undefined;
  fontFamily: undefined;
  fontStyle: undefined;
  backgroundColor: undefined;
  justifyContent: undefined;
  onPress: undefined;
  label: undefined;
  margin: undefined;
  placeholder: undefined;
  placeholderTextColor: undefined;
  onChangeText: undefined;
  marginText: undefined;
  borderBottomColor:undefined;
  fontSizeInput: undefined;
  colorInput: undefined;
  fontWeightInput: undefined;
  fontFamilyInput: undefined;
  fontStyleInput: undefined;
};

const ButtonTextInput = (props: Value) => {
  const [hasFocus,sethasFocus]= useState(false)

  const styles = StyleSheet.create({
    Container: {
      width: props.width || null,
      height: props.height || null,
      backgroundColor: props.backgroundColor || 'transparent',
      borderRadius: props.borderRadius || 5,
      shadowColor: props.shadowColor || '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: props.shadowOpacity || 0.5,
      shadowRadius: props.shadowRadius || 2,
      elevation: props.elevation || null,
      marginVertical: props.margin || normalize(5),
      borderBottomWidth:1,
      borderBottomColor:hasFocus?props.borderBottomColor:'#C2BFBF'
    },
    Title: {
      fontSize: props.fontSize || normalize(15),
      color: props.color || '#000',
      fontWeight: props.fontWeight || 'bold',
      fontFamily: props.fontFamily || 'Roboto',
      fontStyle: props.fontStyle || 'normal',
      margin: props.marginText || normalize(5),
    },
    textInputStyle:{
      fontSize: normalize(15),
      paddingHorizontal: props.paddingHorizontal || normalize(10),
      paddingVertical: normalize(5),
      color: props.colorInput || '#000',
      fontWeight: props.fontWeightInput || '400',
      fontFamily: props.fontFamily || 'Roboto',
      fontStyle: props.fontStyleInput || 'normal',
    }
  });

  return (
    <View>
     {props.label &&
      <Text style={styles.Title}>{props.label}</Text>}

      <View style={styles.Container}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          style={styles.textInputStyle}
          onChangeText={props.onChangeText}
          onFocus={() => sethasFocus(true)}
          onBlur={() => sethasFocus(false)}
        />
      </View>
    </View>
  );
};

export default ButtonTextInput;
