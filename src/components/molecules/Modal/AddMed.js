import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
  GREY_OUTLINE,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInputMask} from 'react-native-masked-text';
import NewToggleButton from '../ToggleButton/NewToggleButton';
import Feather from 'react-native-vector-icons/Feather';
import {set} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import {GetAvailableMedicines} from '../../../reduxV2/action/PatientAction';
import moment from 'moment';
import {SearchHint} from '../SearchHint/SearchHint';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import { TouchableWithoutFeedback } from 'react-native';

const AddMed = ({visible, onCancel, onUpdate, editMode, data, setVisible}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    // category: '',
    amount: '',
    description: '',
    time: [
      {
        value: '',
        amPm: 'AM',
      },
    ],
  });
  const [error, setError] = useState([true, true, true]);
  const [timeValidation, settimeValidation] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [focused, setFocused] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [medSelected, setMedSelected] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode) {
      const {time} = data;
      const _time = [];
      if (time) {
        time.map((t, i) => {
          if (t) {
            const time =
              t && moment(t) && moment(t).format('hh:mm a') != 'Invalid date'
                ? moment(t).format('hh:mm a')
                : t;
            _time.push({
              value: time.substr(0, time.length - 2),
              amPm: time.substr(time.length - 2, 2),
            });
          }
        });
      }
      setDetails({
        ...data,
        time: _time,
      });
      settimeValidation(true);
    } else {
      setDetails({
        name: '',
        // category: '',
        amount: '',
        description: '',
        time: [
          {
            value: '',
            amPm: 'AM',
          },
        ],
      });
    }
  }, [data, editMode]);

  const successCallback = (_data) => {
    setavailableMeds(_data);
  };
  const errorCallback = () => {};

  const onChange = (text) => {
    setDetails({...details, name: text});
  };
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (details.name == '') {
        setavailableMeds([]);
      } else {
        dispatch(
          GetAvailableMedicines(details.name, successCallback, errorCallback),
        );
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [details.name, dispatch]);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onCancel);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onCancel);
    };
  }, []);
  const onFocus = () => {
    setFocused(true);
    setMedSelected(false);
  };
  const onBlur = () => {
    // setFocused(false);
  };


  return (
    <BlurModal
      {...{visible, setVisible}}
      onCancel={() => {
        setDetails({
          name: '',
          category: '',
          //amount: '',
          date: '',
          time: [
            {
              value: '',
              amPm: 'AM',
            },
          ],
        });
        setIsSubmit(false)
        onCancel();
      }}>
      {availableMeds.length > 0 && details.name.length > 0 && !medSelected && focused ? (
        // <TouchableWithoutFeedback 
        // onPress={() => {setMedSelected(!medSelected)}} 
        // // style={customTouchableStyle}
        // >
        <SearchHint
          onSelect={(text) => {
            console.log({text});
            setMedSelected(true);
            setDetails({...details, name: text});
          }}
          name={details.name}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
        // </TouchableWithoutFeedback>
      ) : null}
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {Local('doctor.medical_history.add_pills')}
      </Text>
      <View
        onLayout={({
          nativeEvent: {
            layout: {height, y},
          },
        }) => {
          setTopOffset(height + y + 8);
        }}
        style={{width: 300}}>
        <TextInput
          style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          value={details.name}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          // placeholder={`Medicine Name`}
          placeholder={`${Local('doctor.medical_history.search_medicine')}`}
          placeholderTextColor={
            Colors.input_placeholder_color[theme]
          }></TextInput>
      </View>
      {details.name == "" && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Medicine Name should not be empty'}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
          width: 300,
        }}>
        <TextInput
          value={details.description}
          onChangeText={(text) => setDetails({...details, description: text})}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
          placeholder={`${Local('doctor.medical_history.course_description')}`}
          style={[
            styles.text,
            {
              borderBottomWidth: 0,
              flex: 1,
              marginBottom: 0,
              color: Colors.primary_text_color[theme],
            },
          ]}
        />
      </View>
      {details.description == "" && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Description should not be empty'}
        />
      )}

      <Text
        style={[
          styles.text,
          {
            borderBottomWidth: 0,
            marginBottom: 0,
            color: Colors.primary_text_color[theme],
          },
        ]}>
        {Local('doctor.medical_history.time')}
      </Text>

      {details.time.map((time, i) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              value={time.value}
              onChangeText={(text) => {
                console.log(text);
                let temp = details.time;
                temp[i].value = text;
                setDetails({...details, time: temp});
                let valid = true;
                let errors = error;
                details.time.map((t, i) => {
                  const split = t.value.split(':');
                  const hours = split[0] ? parseInt(split[0]) : null;
                  const mins = split[1] ? parseInt(split[1]) : null;
                  //don't use && when there's change that any of the operand could be 0(as valid)
                  hours != null && mins != null
                    ? hours > 12
                      ? (valid = false)
                      : mins >= 60
                      ? (valid = false)
                      : (valid = true)
                    : (valid = false);
                  if (text.length == 5) {
                    errors[i] = valid;
                  } else {
                    errors[i] = true;
                  }
                });
                setError(errors);
                settimeValidation(valid);
              }}
              style={{
                padding: 5,
                borderRadius: 30,
                borderColor: GREY_OUTLINE,
                borderWidth: 1,
                width: 80,
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                color: Colors.primary_text_color[theme],
                paddingHorizontal: 10,
                textAlign: 'center',
                height: 35,
              }}
            />
            {(!error[i] || !timeValidation) && isSubmit && (
              <AnimatedErrorText
                style={{alignSelf: 'center'}}
                text={'Invalid time'}
              />
            )}
          </View>
          <View style={!error[i] && {marginBottom: 20}}>
            <NewToggleButton
              text0="AM"
              text1="PM"
              style={{
                width: 80,
                marginLeft: 20,
                elevation: 0,
                height: 35,
                backgroundColor: SECONDARY_COLOR,
                backgroundColor: Colors.landing_toggle_btn[theme],
                // padding: 2,
                // borderWidth: 1,
                // borderColor: "#fff"
              }}
              toggle={time.amPm === 'AM'}
              onToggle={() => {
                let temp = details.time;
                temp[i].amPm = temp[i].amPm === 'AM' ? 'PM' : 'AM';
                setDetails({...details, time: temp});
              }}
            />
          </View>
        </View>
      ))}

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity
          disabled={details.time.length > 4}
          onPress={() => {
            let temp = details.time;
            console.log(details.time, '......time fefore');
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.push({value: '', amPm: 'AM'});
            settimeValidation(false);
            setDetails({...details, time: temp});
            const errors = error;
            errors.push(true);
            setError(errors);
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="plus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={details.time.length == 1}
          onPress={() => {
            let temp = details.time;
            if (temp.length == 1) return;
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.pop();
            setDetails({...details, time: temp});
            const errors = error;
            errors.pop();
            setError(errors);
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="minus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>

      <DmzButton
        // disabled={
          // details.name === '' ||
          //  details.amount == '' ||
          // details.category === '' ||
          // details.description === '' ||
          // !timeValidation
        // }
        onPress={() => {
          setIsSubmit(true)
          let valid = true;
          details.time.map((t, i) => {
            if (t.value === '') valid = false;
          });
          if (valid) {
            console.log('isValid');
            if(details.name === '' ||
            //  details.amount == '' ||
            // details.category === '' ||
            details.description === '' ||
            !timeValidation) {
              return
            }
            onUpdate(details);
            onCancel();
            setIsSubmit(false)
            setDetails({
              name: '',
              // category: '',
              amount: '',
              description: '',
              time: [
                {
                  value: '',
                  amPm: 'AM',
                },
              ],
            });
          }
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
            width: '70%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddMed;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    paddingTop: 20,
    marginBottom: 7,
  },
  inputContainer: {},
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
});
