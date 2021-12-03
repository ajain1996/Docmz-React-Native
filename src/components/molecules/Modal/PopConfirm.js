import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';


const Popconfirm = ({
  text,
  onCancel,
  visible,
  onUpdate,
}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);

  return (
    <BlurModal {...{ visible, onCancel }}>

      <View style={{ paddingVertical: "8%" }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            marginRight: 10,
            color: Colors.primary_text_color[theme],
            textAlign: 'center'
          }}>
          {text ? text : 'Are you sure you want to delete?'}
        </Text>
        <View View style={{ flexDirection: 'row', marginTop: '8%' }}>
          <DmzButton
            onPress={onCancel}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '40%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="NO"
          />
          <DmzButton
            onPress={onUpdate}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '40%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="YES"
          />
        </View>

      </View>
    </BlurModal >
  );
};

export default Popconfirm;
