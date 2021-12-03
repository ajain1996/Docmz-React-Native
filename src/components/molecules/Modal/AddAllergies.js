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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';

const AddAllergies = ({ visible, onCancel, onUpdate, editMode , editingData, setVisible }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    reaction: '',
    Severity: '',
  });

  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false)


  useEffect(() => {
    const temp = ["Wheat", "Pollen", "Dust", "Lactose"].filter((item, index) => {
      if(details.name.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(details.name.toLowerCase())) return item
    })

    setavailableMeds(temp)
  }, [details])
  

  useEffect(() => {
    console.log(editingData,editMode)
    if (editMode) {
      setDetails({
        ...editingData,
        name: editingData.allergyName,
        reaction: editingData.reaction,
        Severity: editingData.severity,
      })
    } else {
      setDetails({
        name: '',
        reaction: '',
        Severity: '',
      })
    }
  }, [editMode || editingData])

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
          color: Colors.primary_text_color[theme],
        }}>
        {Local("doctor.medical_history.add_allergies")}
      </Text>

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

      <TextInput
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.allergy_name_type")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />
      {!details?.name && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid name'}
              />
            )}

      <TextInput
        value={details.reaction}
        onChangeText={(text) => setDetails({ ...details, reaction: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.reaction")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />

{!details?.reaction && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid reaction'}
              />
            )}

      <TextInput
        value={details.Severity}
        onChangeText={(text) => setDetails({ ...details, Severity: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.severity")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />

{!details?.Severity && isSubmit && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Please Enter a Valid severity'}
              />
            )}

      <DmzButton
        // disabled={details.name === '' || details.Severity === '' || details.reaction === ""}
        onPress={() => {
          
          if(details.name === '' || details.Severity === '' || details.reaction === "") {
            setIsSubmit(true)
            return
          }
          onUpdate(details);
          setIsSubmit(false)
          setDetails({
            name: '',
            reaction: '',
            Severity: '',
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

export default AddAllergies;

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
