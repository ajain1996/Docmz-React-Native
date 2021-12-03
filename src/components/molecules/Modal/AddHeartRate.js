import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddHeartRate = ({onCancel, visible, onUpdate, setVisible}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [heartRate, setHeartRate] = useState('');

  const handleIncementHeight = () => {
    if (heartRate == '') setHeartRate('1');
    else setHeartRate((parseInt(heartRate) + 1).toString());
  };

  const handleDecrementWeight = () => {
    if (heartRate > 0) setHeartRate((parseInt(heartRate) - 1).toString());
  };
  return (
    <BlurModal {...{visible, onCancel, setVisible}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 20,
        }}>
        {Local('doctor.medical_history.add_heart_rate')}
      </Text>

      {/* <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 13,
          color: INPUT_PLACEHOLDER,
          alignSelf: 'flex-start',
        }}>
        bpm
      </Text> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <TextInput
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            padding: 4,
            color: Colors.primary_text_color[theme],
            flex: 1,
          }}
          value={heartRate}
          onChangeText={(text) => setHeartRate(text)}
          keyboardType="decimal-pad"
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            color: Colors.input_placeholder_color[theme],
            marginRight: 10,
          }}>
          bpm
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleDecrementWeight}>
            <FontAwesomeIcon
              color={NEW_PRIMARY_BACKGROUND}
              name="minus"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleIncementHeight}
            style={{marginLeft: 12}}>
            <FontAwesomeIcon
              color={NEW_PRIMARY_BACKGROUND}
              name="plus"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {heartRate > 480 && (
        <AnimatedErrorText
          style={{
            width: '70%',
            alignSelf: 'center',
            marginTop: -27,
            marginRight: 10,
            marginBottom: 5,
          }}
          text={'Please Enter the appropriate fields'}
        />
      )}

      <DmzButton
        disabled={heartRate === '' || heartRate == 0}
        onPress={() => {
          onUpdate(heartRate);
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddHeartRate;
