import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colorsV2';

function VerticalText({ text, isActive = false, setActiveDate, theme }) {
  return (
    <TouchableOpacity onPress={() => { setActiveDate(text) }}>
      <View style={[Styles.Day, isActive && Styles.DayActive]}>
        <Text
          style={[Styles.DayText, Styles.Up, isActive && Styles.DayTextActive,
          { color: Colors.secondary_text_color[theme] }]}>
          {text.Top}
        </Text>
        <Text
          style={[Styles.DayText, Styles.Down, isActive && Styles.DayTextActive,
          { color: Colors.secondary_text_color[theme] }]}>
          {text.Bottom}
        </Text>
      </View>
    </TouchableOpacity>

  );
}
const Styles = StyleSheet.create({
  Day: {
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DayText: {
    fontSize: 16,
    color: '#000',
  },
  DayTextActive: {
    color: '#fff',
  },
  Up: {
    fontWeight: 'bold',
  },
  Down: {
    fontWeight: '500',
  },
  DayActive: {
    backgroundColor: '#efa860',
    borderRadius: 6,
  },
});

export default VerticalText;
