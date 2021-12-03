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
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddWeight = ({onCancel, visible, onUpdate, vitalsInfo, setVisible}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const {weight} = vitalsInfo;
  const [Weight, setWeight] = useState('');
  const [fatMass, setFatMass] = useState('');
  const [date, setDate] = useState('');
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.fatMass || vitalsInfo.weight) {
      setFatMass(vitalsInfo.fatMass ? vitalsInfo.fatMass.value : '');
      setWeight(weight.value);
    }
  }, [vitalsInfo]);

  const handleIncementWeight = () => {
    if (Weight == '') setWeight('1');
    else setWeight((parseInt(Weight) + 1).toString());
  };

  const handleDecrementWeight = () => {
    if (Weight > 0) setWeight((parseInt(Weight) - 1).toString());
  };

  const handleIncementFatMass = () => {
    if (fatMass == '') setFatMass('1');
    else setFatMass((parseInt(fatMass) + 1).toString());
  };

  const handleDecrementFatMass = () => {
    if (fatMass > 0) setFatMass((parseInt(fatMass) - 1).toString());
  };
  return (
    <BlurModal {...{visible, onCancel, setVisible, moreMargin}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 20,
        }}>
        {Local('doctor.medical_history.add_weight')}
      </Text>

      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          marginBottom: 25,
        }}>
        <View>
          <Text
            style={[
              styles.smallText,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('doctor.medical_history.weight')} (kg)
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[
                styles.inputText,
                {color: Colors.primary_text_color[theme]},
              ]}
              value={Weight}
              onChangeText={(text) => setWeight(text)}
              keyboardType="decimal-pad"
            />
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementWeight}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="minus"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncementWeight}
                style={{marginLeft: 12}}>
                <FontAwesomeIcon
                  color={NEW_PRIMARY_BACKGROUND}
                  name="plus"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {Weight > 500 && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
        {/* <View style={{ marginTop: 12 }}>
          <Text style={[styles.smallText, { color: Colors.primary_text_color[theme],}]}>{Local('doctor.medical_history.fat_mass')} (kg)</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.inputText, { color: Colors.primary_text_color[theme],}]}
              value={fatMass}
              onChangeText={(text) => setFatMass(text)}
              keyboardType="decimal-pad"
            />
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementFatMass} >
                <FontAwesomeIcon color={NEW_PRIMARY_BACKGROUND} name="minus" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIncementFatMass} style={{ marginLeft: 12 }}>
                <FontAwesomeIcon color={NEW_PRIMARY_BACKGROUND} name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>

      <DmzButton
        disabled={Weight === '' || Weight == 0}
        onPress={() => {
          onUpdate(Weight, fatMass, date);
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

export default AddWeight;

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
    //alignSelf: 'flex-start',
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
