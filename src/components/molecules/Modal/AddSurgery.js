import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddSurgery = ({ visible, onCancel, onUpdate, editMode, editingData, setVisible }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    type: '',
    docName: '',
    otor: '',
    date: '',
  });

  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false)



  useEffect(() => {
    const temp = ["Tonsils Surgery", "Appendix Expulsion Surgery", "Knee Surgery"].filter((item, index) => {
      if(details.type.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(details.type.toLowerCase())) return item
    })
    setavailableMeds(temp)
  }, [details])
  
  useEffect(() => {
    if (editMode) {
      setDetails({
        ...editingData,
        otor : editingData.otOR,
        docName: editingData.surgeonName,
        type: editingData.surgeryName
      })
    }else{
      setDetails({
        type: '',
        docName: '',
        otor: '',
        date: '',
      })
    }
  }, [editMode || editingData || editingData.surgeryName])

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {Local('doctor.medical_history.add_surgery_details')}
      </Text>

      {availableMeds.length > 0 && details.type.length > 0 && !medSelected && focused ? (
        // <TouchableWithoutFeedback 
        // onPress={() => {setMedSelected(!medSelected)}} 
        // // style={customTouchableStyle}
        // >
        <SearchHint
        onSelect={(text) => {
          console.log({text});
          setMedSelected(true);
          setDetails({...details, type: text});
        }}
        name={details.type}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
        // </TouchableWithoutFeedback>
      ) : null}
      
      <TextInput
        value={details.type}
        onChangeText={(text) => setDetails({ ...details, type: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.medical_history.surgery_type')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme],}]}
      />
      {!details?.type && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid type'}
              />
            )}

      <TextInput
        value={details.docName}
        onChangeText={(text) => setDetails({ ...details, docName: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.medical_history.surgion_name')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme],}]}
      />

{!details?.docName && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid Name'}
              />
            )}

      <TextInput
        value={details.otor}
        onChangeText={(text) => setDetails({ ...details, otor: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.medical_history.ot_or')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme],}]}
      />

{!details?.otor && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid type'}
              />
            )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
        }}>
        <DatePicker
          style={[
            styles.inputText,
            { borderBottomWidth: 0, flex: 1, marginBottom: 0 },
          ]}
          date={details.date}
          mode="date"
          placeholder={`${Local('patient.medical_history.select_date')}`}
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
          onDateChange={(text) => setDetails({ ...details, date: text })}
        />
        {/* <TextInput
          value={details.date}
          onChangeText={(text) => setDetails({ ...details, date: text })}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Date"
          style={[
            styles.text,
            { borderBottomWidth: 0, flex: 1, marginBottom: 0 },
          ]}
          editable={true}
        />
        <TouchableOpacity>
          <FontAwesome5
            name="calendar-alt"
            size={22}
            color={NEW_PRIMARY_COLOR}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity> */}
      </View>

      <DmzButton
        // disabled={details.type === '' || details.docName === '' || details.otor === '' || details.date === ''}
        onPress={() => {
          if(details.type === '' || details.docName === '' || details.otor === '' || details.date === '') {
            setIsSubmit(true)
            return
          }
          onUpdate(details);
          setIsSubmit(false)
          setDetails({
            type: '',
            docName: '',
            otor: '',
            date: '',
          })
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
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddSurgery;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
  inputContainer: {},
});
