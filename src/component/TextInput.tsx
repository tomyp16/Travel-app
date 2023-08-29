import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {normalize} from './Metrics';
import IconFeather from 'react-native-vector-icons/Feather';

type Value = {
  width: number;
  height: number;
  paddingHorizontal: number;
  alignItems: undefined;
  borderRadius: number;
  shadowColor: undefined;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: undefined;
  fontSize: number;
  color: string;
  fontWeight: string;
  fontFamily: string;
  fontStyle: string;
  backgroundColor: string;
  justifyContent: string;
  onPress: string;
  label: string;
  margin: number;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: undefined;
  marginText: number;
  borderBottomColor: string;
  fontSizeInput: string;
  colorInput: string;
  fontWeightInput: string;
  fontFamilyInput: string;
  fontStyleInput: string;
  type: string;
  keyboardType: string;
};

const ButtonTextInput = (props: Value) => {
  const [hasFocus, sethasFocus] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const styles = StyleSheet.create({
    Container: {
      width: props.width || null,
      height: props.height || null,
      flexDirection: props.type ? 'row' : 'column',
      backgroundColor: props.backgroundColor || 'transparent',
      borderRadius: props.borderRadius || 5,
      shadowColor: props.shadowColor || '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: props.shadowOpacity || 0.5,
      shadowRadius: props.shadowRadius || 2,
      elevation: props.elevation || null,
      marginVertical: props.margin || normalize(5),
      borderBottomWidth: 1,
      borderBottomColor: hasFocus ? props.borderBottomColor : '#C2BFBF',
    },
    Title: {
      fontSize: props.fontSize || normalize(15),
      color: props.color || '#000',
      fontWeight: props.fontWeight || 'bold',
      fontFamily: props.fontFamily || 'Roboto',
      fontStyle: props.fontStyle || 'normal',
      margin: props.marginText || normalize(5),
    },
    textInputStyle: {
      flex: props.type ? 1 : null,
      fontSize: normalize(15),
      paddingHorizontal: props.paddingHorizontal || normalize(10),
      color: props.colorInput || '#000',
      fontWeight: props.fontWeightInput || '400',
      fontFamily: props.fontFamilyInput || 'Roboto',
      fontStyle: props.fontStyleInput || 'normal',
    },
    ButtonTouchStyle: {
      justifyContent: 'center',
      // alignContent: 'center',
      padding: normalize(10),
    },
  });

  return (
    <View>
      {props.label && <Text style={styles.Title}>{props.label}</Text>}

      <View style={styles.Container}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          style={styles.textInputStyle}
          onChangeText={props.onChangeText}
          onFocus={() => sethasFocus(true)}
          onBlur={() => sethasFocus(false)}
          secureTextEntry={props.type ? secureTextEntry : false}
          keyboardType={props.keyboardType || 'default'}
        />

        {props.type && (
          <TouchableOpacity
            style={styles.ButtonTouchStyle}
            onPress={() => setsecureTextEntry(!secureTextEntry)}>
            <IconFeather
              name={!secureTextEntry ? 'eye-off' : 'eye'}
              size={normalize(20)}
              color={secureTextEntry ? '#118EEA' : '#C2BFBF'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ButtonTextInput;
