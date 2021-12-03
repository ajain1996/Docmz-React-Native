import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddBloodPressure = ({
  headingText,
  labelText,
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [sys, setSys] = useState('');
  const [Dia, setDia] = useState('');
  const [date, setDate] = useState('');
  const moreMargin = true;

  useEffect(() => {
    const {bloodPressure} = vitalsInfo;
    if (vitalsInfo?.bloodPressure?.length > 0) {
      const {systolic, dialostic} = bloodPressure[bloodPressure.length - 1];
      setSys(systolic);
      setDia(dialostic);
    }
  }, [vitalsInfo]);

  const handleIncementSys = () => {
    if (sys == '') setSys('1');
    else setSys((parseInt(sys) + 1).toString());
  };

  const handleDecrementSys = () => {
    if (sys > 0) setSys((parseInt(sys) - 1).toString());
  };

  const handleIncementDia = () => {
    if (Dia == '') setDia('1');
    else setDia((parseInt(Dia) + 1).toString());
  };

  const handleDecrementDia = () => {
    if (Dia > 0) setDia((parseInt(Dia) - 1).toString());
  };
  return (
    <BlurModal {...{visible, onCancel, setVisible, moreMargin}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
          color: Colors.primary_text_color[theme],
        }}>
        {Local('doctor.medical_history.add_blood_pressure')}
      </Text>

      <View
        style={{
          marginBottom: 25,
        }}>
        <View>
          <Text
            style={[
              styles.smallText,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('doctor.medical_history.systolic')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[
                styles.inputText,
                {color: Colors.primary_text_color[theme]},
              ]}
              value={sys}
              onChangeText={(text) => setSys(text)}
              keyboardType="decimal-pad"
            />

            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementSys}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="minus"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncementSys}
                style={{marginLeft: 12}}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="plus"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {sys > 370 && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Please Enter a Valid systolic pressure'}
            />
          )}
        </View>
        <View style={{marginTop: 12}}>
          <Text
            style={[
              styles.smallText,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('doctor.medical_history.diastolic')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[
                styles.inputText,
                {color: Colors.primary_text_color[theme]},
              ]}
              value={Dia}
              onChangeText={(text) => setDia(text)}
              keyboardType="decimal-pad"
            />
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementDia}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="minus"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncementDia}
                style={{marginLeft: 12}}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="plus"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {Dia > 360 && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
      </View>

      <DmzButton
        disabled={!sys || !Dia}
        onPress={() => {
          onUpdate(sys, Dia, date);
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

export default AddBloodPressure;

const styles = StyleSheet.create({
  icons: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    left: '-18%',
  },
  smallText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: INPUT_PLACEHOLDER,
    alignSelf: 'flex-start',
  },
  inputText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    padding: 4,
    width: '100%',
    borderColor: NEW_PRIMARY_BACKGROUND,
    borderBottomWidth: 1.5,
  },
});
