import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function RadioBtn({active, keyName, value = 'null', setKeyName = () => {}}) {
  const onPress = () => {
    setKeyName(keyName);
  };

  const customTouchableStyle = [
    Styles.Touchable,
    {
      backgroundColor: active ? '#047b7b' : '#ffffff',
    },
  ];
  const customTextStyle = [
    Styles.Text,
    {
      color: active ? '#fff' : '#047b7b',
      fontWeight: active ? 'bold' : 'normal',
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={onPress} style={customTouchableStyle}>
      <Text style={customTextStyle}>{value}</Text>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  Touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
  },
  Text: {
    fontWeight: 'bold',
  },
});
export default RadioBtn;
