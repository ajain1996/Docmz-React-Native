import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, View, BackHandler } from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  NEW_PRIMARY_LIGHT_BG,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { useDispatch, useSelector } from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';


const AddReport = ({
  visible,
  onCancel,
  onUpload,
  selectFile,
  editMode,
  testName,
  testType,
  setTestName,
  setTestType,
  fileName = '',
  disable,
  editDisable,
  setVisible
}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);

  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);



  useEffect(() => {
    const temp = ["CBC Widal", "Haemoglobin Test", "Full Body Checkup", "Thyroid Checkup", "Blood Sugar Test"].filter((item, index) => {
      if(testName.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(testName.toLowerCase())) return item
    })
    setavailableMeds(temp)
  }, [testName])

  /* useEffect(() => {
    const backAction = () => {

      navigation.goBack()
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); */
  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {Local("doctor.medical_history.upload_report")}

      </Text>
      {/* {true ? ( */}
      {availableMeds.length > 0 && testName.length > 0 && !medSelected && focused ? (
        // <TouchableWithoutFeedback 
        // onPress={() => {setMedSelected(!medSelected)}} 
        // // style={customTouchableStyle}
        // >
        <SearchHint
          onSelect={(text) => {
            console.log({text});
            setMedSelected(true);
            setTestName(text)
          }}
          name={testName}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
        // </TouchableWithoutFeedback>
      ) : null}
      <TextInput
        value={testName}
        onChangeText={(text) => setTestName(text)}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("patient.medical_history.name_of_report")}`}
        style={[styles.TextInput, {color: Colors.primary_text_color[theme],}]}
      />
      {testName == "" && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Report Name should not be empty'}
        />
      )}
      <TextInput
        value={testType}
        onChangeText={(text) => setTestType(text)}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("patient.medical_history.type_of_test")}`}
        style={[styles.TextInput, {color: Colors.primary_text_color[theme],}]}
      />
      {testType == "" && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Report Type should not be empty'}
        />
      )}
      <TouchableOpacity onPress={selectFile}>
        {fileName ? (
          <View
            style={{
              backgroundColor: NEW_PRIMARY_LIGHT_BG,
              paddingHorizontal: '12%',
              paddingVertical: '4%',
              marginVertical: '4%',
              borderRadius: 13,
              elevation: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                paddingVertical: 4,
                color: Colors.primary_text_color[theme],
              }}>
              {fileName}
            </Text>
          </View>
        ) : (
            <View
              style={{
                backgroundColor: NEW_PRIMARY_LIGHT_BG,
                paddingHorizontal: '12%',
                paddingVertical: '4%',
                marginVertical: '4%',
                borderRadius: 13,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  paddingVertical: 4,

                }}>
                {Local("doctor.medical_history.select_report_file")}
            </Text>
            </View>
          )}
      </TouchableOpacity>
      {fileName == "" && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Please select a file'}
        />
      )}

      <DmzButton
        onPress={() => {
          
          if(disable || !fileName) {
            setIsSubmit(true)
            return
          }
          onUpload();
          setIsSubmit(false)
          onCancel();
        }}
        // disabled={!editMode ? disable : disable}
        // disabled={!editMode ? disable : editDisable}
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
            marginTop: 15,
            elevation: 3,
          },
        }}
        text="UPLOAD"
      />
    </BlurModal>
  );
};

export default AddReport;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    padding: 5,
    marginTop: 7,
  },
  TextInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
});
