import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import BlurModal from './BlurModal';
import React, {useState, useEffect} from 'react';
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

const AddHeight = ({
  unit,
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [height, setHeight] = useState('');
  useEffect(() => {
    const {height} = vitalsInfo;
    if (vitalsInfo.height) setHeight(height.value);
  }, [vitalsInfo]);
  const handleIncementHeight = () => {
    if (height == '') setHeight('1');
    else setHeight((parseInt(height) + 1).toString());
  };

  const handleDecrementWeight = () => {
    if (height > 0) setHeight((parseInt(height) - 1).toString());
  };
  return (
    <BlurModal {...{visible, onCancel, setVisible}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
          color: Colors.primary_text_color[theme],
        }}>
        {Local('doctor.medical_history.add_height')}
      </Text>

      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 13,
          color: Colors.input_placeholder_color[theme],
          alignSelf: 'flex-start',
        }}>
        {Local('doctor.medical_history.height')}
      </Text>

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
            color: Colors.primary_text_color[theme],
            fontSize: 20,
            padding: 4,
            flex: 1,
          }}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="decimal-pad"
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            color: Colors.input_placeholder_color[theme],
            marginLeft: 12,
            marginRight: 12,
          }}>
          {unit}
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
      {height > 272 && (
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
        disabled={height === '' || height == 0}
        onPress={() => {
          onUpdate(height);
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

export default AddHeight;
