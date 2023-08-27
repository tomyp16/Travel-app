import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {normalize} from './Metrics';

type Value = {
  width: undefined;
  height: undefined;
  padding: undefined;
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
};

const ButtonTextInput = (props: Value) => {
  const styles = StyleSheet.create({
    Container: {
      width: props.width || null,
      height: props.height || null,
      backgroundColor: props.backgroundColor || '#282B56',
      padding: props.padding || normalize(10),
      justifyContent: props.justifyContent || 'center',
      alignItems: props.alignItems || 'center',
      borderRadius: props.borderRadius || normalize(20),
      shadowColor: props.shadowColor || '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: props.shadowOpacity || 0.5,
      shadowRadius: props.shadowRadius || 2,
      elevation: props.elevation || null,
      margin: props.margin || normalize(5),
    },
    Title: {
      fontSize: props.fontSize || normalize(15),
      color: props.color || '#000',
      fontWeight: props.fontWeight || 'bold',
      fontFamily: props.fontFamily || 'Roboto',
      fontStyle: props.fontStyle || 'normal',
      margin: props.marginText || normalize(5),
    },
  });

  return (
    <View>
      <Text style={styles.Title}>{props.label}</Text>

      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        style={styles.Container}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default ButtonTextInput;
