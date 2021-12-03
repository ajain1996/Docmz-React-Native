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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddTemperature = ({
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [Cel, setCel] = useState('');
  const [Far, setFar] = useState('');
  const [date, setDate] = useState('');
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.temperature) {
      const {temperature} = vitalsInfo;
      setCel(temperature.value);
    }
  }, [vitalsInfo]);

  const handleIncementWeight = () => {
    if (Cel == '') setCel('1');
    else setCel((parseInt(Cel) + 1).toString());
  };
  const handleDecrementWeight = () => {
    if (Cel > 0) setCel((parseInt(Cel) - 1).toString());
  };
  const handleIncementFatMass = () => {
    if (Far == '') setFar('1');
    else setFar((parseInt(Far) + 1).toString());
  };
  const handleDecrementFatMass = () => {
    if (Far > 0) setFar((parseInt(Far) - 1).toString());
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
        {Local('doctor.medical_history.record_temperature')}
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
            Temperature °C
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[
                styles.inputText,
                {color: Colors.primary_text_color[theme]},
              ]}
              value={Cel}
              onChangeText={(text) => {
                setCel(Number(text));
                setFar(Number(1.8 * text + 32));
              }}
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
          {Cel > 42.3 && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
        {/* <View style={{ marginTop: 12 }}>
          <Text style={styles.smallText}>F</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputText}
              value={Far}
              defaultValue={String(Far)}
              // placeholder={String(Far)}
              onChangeText={(text) => setFar(Number(text))}
              editable={false}
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
        disabled={String(Cel) === '' || Cel == 0}
        onPress={() => {
          onUpdate(Cel, Far, date);
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

export default AddTemperature;

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
