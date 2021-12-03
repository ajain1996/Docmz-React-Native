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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const ThreeField = ({
  headingText,
  labelText,
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  // const { value } = vitalsInfo.bloodSugar
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.bloodSugar) {
      const {bloodSugar} = vitalsInfo;
      setField1(bloodSugar.mg);
      setField2(bloodSugar.mmol);
      // setFar()
    }
  }, [vitalsInfo]);
  const handleIncementWeight = () => {
    if (field1 == '') setField1('1');
    else setField1((parseInt(field1) + 1).toString());
  };
  const handleDecrementWeight = () => {
    if (field1 > 0) setField1((parseInt(field1) - 1).toString());
  };
  const handleIncementFatMass = () => {
    if (field2 == '') setField2('1');
    else setField2((parseInt(field2) + 1).toString());
  };
  const handleDecrementFatMass = () => {
    if (field2 > 0) setField2((parseInt(field2) - 1).toString());
  };
  return (
    <BlurModal {...{visible, onCancel, setVisible, moreMargin}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
        }}>
        {headingText}
      </Text>

      <View
        style={{
          marginBottom: 25,
        }}>
        <View>
          <Text style={styles.smallText}>{labelText[0]}</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputText}
              value={field1}
              onChangeText={(text) => setField1(text)}
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
          {field1 > 500 && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
        {/* <View style={{ marginTop: 12 }}>
          <Text style={styles.smallText}>{labelText[1]}</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputText}
              value={field2}
              onChangeText={(text) => setField2(text)}
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
      {/* 
      <Text style={styles.smallText}>Date</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <DatePicker
          style={[
            styles.inputText,
            { borderBottomWidth: 0, flex: 1, marginBottom: 0 },
          ]}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            // dateInput:{borderWidth: 0},
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 0
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(text) => setDate(text)}
        />
       <TextInput
          value={date}
          onChangeText={(text) => setDate(text)}
          style={[
            styles.inputText,
            {borderBottomWidth: 0, flex: 1, marginBottom: 0},
          ]}
          editable={false}
        />
        <TouchableOpacity>
          <FontAwesome5
            name="calendar-alt"
            size={22}
            color={NEW_PRIMARY_COLOR}
            style={{marginHorizontal: 5}}
          />
        </TouchableOpacity> 
      </View> */}

      <DmzButton
        disabled={field1 == 0 || field2 == 0 || field1 == '' || field2 == ''}
        onPress={() => {
          onUpdate(field1, field2, date);
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

export default ThreeField;

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
    width: '94%',
    borderColor: NEW_PRIMARY_BACKGROUND,
    borderBottomWidth: 1.5,
  },
});
