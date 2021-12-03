import React, {useState, useReducer, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TextInput,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TopNavBar from '../TopNavBar/TopNavBar';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import { profilePicUploaded, startLoading } from '../../../reduxV2/action/PatientAction';

const ConfirmAppointment = ({navigation, route}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const {
    data: slotData,
    doctorData,
    showOnly = false,
    showOnlyData = {},
    onBackPress = () => navigation.goBack(),
  } = route.params;
  //console.log(route, '%%%%%%%%%%%%%%%%%%%');
  const {doctor, patientInfo} = showOnlyData;
  /*console.log(
    showOnlyData,
    doctorData?.deviceToken,
    'dddddddddddddddddddddddddddddddddddddddd',
  );*/
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [memberCredential, setMemberCredential] = useState({
    id: '',
    name: '',
    contact: '',
    date: '',
  });
  const [notes, setnotes] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const PopupTranslateY = useRef(new Animated.Value(0)).current;

  const {familyMember, patient, isPatientAccountReducerLoading} = useSelector(
    (state) => state.PatientReducer,
  );

  if (memberCredential.id === '' && slotData && slotData.bookedFor) {
    setMemberCredential({
      id: patient._id,
      name: `${patient.firstName} ${patient.lastName}`,
      date: moment(slotData.bookedFor).format("DD MMM 'YY hh:mm A"),
      contact: patient.phone,
    });
  }
  const credentialSet = (id) => {
    if (id == patient._id) {
      setMemberCredential({
        id: patient._id,
        name: `${patient.firstName} ${patient.lastName}`,
        date: moment(slotData.bookedFor).format("DD MMM 'YY hh:mm A"),
        contact: patient.phone,
      });
    } else {
      const member = familyMember.find((item) => item._id === id);
      setMemberCredential({
        id: id,
        name: `${member.firstName} ${member.lastName}`,
        date: moment(slotData.bookedFor).format("DD MMM 'YY hh:mm A"),
        contact: member.contact,
      });
    }
    //console.log(memberCredential);
  };

  const [error, setErrors] = useState({
    notes: false,
    reason: false,
  });

  const handelAppointmentSubmit = () => {
 

    if (notes.length == 0) {
      setErrors({
        ...error,
        notes: true,
      });
      return;
    }

    if (reasonForVisit.length == 0) {
      setErrors({
        ...error,
        reason: true,
      });
      return;
    }
    let data = {};
    if (memberCredential.id === patient._id) {
      data = {
        timeSlot: slotData._id,
        patient: patient._id,
        forWhom: 'Myself',
        patientInfo: {
          name: `${patient.firstName} ${patient.lastName}`,
          firstName: patient.firstName,
          lastName: patient.lastName,
          contact: patient.phone,
          age: patient.age,
          gender: patient.gender || patient.sex,
          notes,
        },
        reasonForVisit: reasonForVisit,
        fee: doctorData?.fee,
        doctor: doctorData?._id,
      };
    } else {
      const member = familyMember.find(
        (item) => item._id === memberCredential.id,
      );
      data = {
        timeSlot: slotData._id,
        patient: patient._id,
        forWhom: member.relationship,
        patientInfo: {...member, notes},
        reasonForVisit: reasonForVisit,
        fee: doctorData?.fee,
        doctor: doctorData?._id,
        deviceToken: doctorData?.deviceToken,
      };
    }
    // if (doctorData?.payment) {

    navigation.navigate('Questionnaire', {
      doctorData,
      appointmentBookingData: data,
    })



    // } else {
    //   dispatch(
    //     bookAppointment({ ...data, amount: '0', fee: "0" }, () => {
    //       navigation.navigate('Appointments');
    //     }),
    //   );
    // }
  };

  const onPress = (id) => {
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };
  const patientInfoobj = JSON.parse(patientInfo);
  console.log(typeof patientInfoobj);

  return (
    <View
      style={[
        ConfirmAppointmentStyles.Container,
        {backgroundColor: Colors.primary_background[theme]},
      ]}>
      <TopNavBar
        headerText={`${Local(
          'patient.appointment_summary.appointment_summary',
        )}`}
        navigation={navigation}
        onLeftButtonPress={onBackPress}
        style={{
          Container: {
            height: 'auto',
            paddingTop: 5,
          },
        }}
      />

      <ScrollView style={ConfirmAppointmentStyles.ScrollView}>
        <View style={[ConfirmAppointmentStyles.rootGroup, {marginTop: 40}]}>
          <Text
            style={[
              ConfirmAppointmentStyles.rootHeading,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('patient.appointment_summary.patient_details')}
          </Text>
          <View
            style={[
              ConfirmAppointmentStyles.inputGroup,
              {backgroundColor: Colors.secondary_background[theme]},
            ]}>
            {showOnly && patientInfo ? (
              <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  {color: Colors.primary_text_color[theme]},
                ]}>
                {patientInfoobj.firstName + ' ' + patientInfoobj.lastName}
              </Text>
            ) : (
              <View
                style={[
                  ConfirmAppointmentStyles.text,
                  ConfirmAppointmentStyles.upperText,
                ]}>
                <Picker
                  style={{
                    height: 20,
                    width: '100%',
                    color: Colors.primary_text_color[theme],
                  }}
                  selectedValue={memberCredential.id}
                  onValueChange={credentialSet}>
                  <Picker.Item color="#777" label="Select Name" value={null} />
                  <Picker.Item
                    label={`${patient.firstName} ${patient.lastName}`}
                    value={patient._id}
                  />
                  {familyMember.map((item) => (
                    <Picker.Item
                      label={`${item.firstName} ${item.lastName}`}
                      value={item._id}
                    />
                  ))}
                </Picker>
              </View>
            )}
            {!showOnly && (
              <TextInput
                value={memberCredential.contact}
                keyboardType={'number-pad'}
                placeholder={`${Local('patient.familyMember.contact_number')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                onChangeText={(text) =>
                  setMemberCredential({...memberCredential, contact: text})
                }
                style={[
                  ConfirmAppointmentStyles.text,
                  ConfirmAppointmentStyles.upperText,
                  {color: Colors.primary_text_color[theme]},
                ]}
              />
            )}
            {showOnly && patientInfo && (
              <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  {color: Colors.primary_text_color[theme]},
                ]}>
                {patient.phone}
              </Text>
            )}
          </View>
        </View>

        <View style={ConfirmAppointmentStyles.rootGroup}>
          <Text
            style={[
              ConfirmAppointmentStyles.rootHeading,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('patient.appointments.appointment')}
          </Text>
          <View
            style={[
              ConfirmAppointmentStyles.inputGroup,
              {backgroundColor: Colors.secondary_background[theme]},
            ]}>
            {showOnly ? (
              <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  {color: Colors.primary_text_color[theme]},
                ]}>
                {showOnlyData.reasonForVisit}
              </Text>
            ) : (
              <>
                <TextInput
                  placeholder={`${Local(
                    'doctor.patient_details.reason_for_visit',
                  )}`}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  onChangeText={(text) => {
                    if (text.length > 0) {
                      setErrors({
                        ...error,
                        reason: false,
                      });
                    }
                    setReasonForVisit(text);
                  }}
                  style={[
                    ConfirmAppointmentStyles.text,
                    ConfirmAppointmentStyles.upperText,
                    {color: Colors.primary_text_color[theme]},
                  ]}
                />
              </>
            )}

            <Text
              style={[
                ConfirmAppointmentStyles.text,
                {color: Colors.primary_text_color[theme]},
              ]}>
              {slotData && slotData.bookedFor
                ? moment(slotData.bookedFor).format("DD MMM 'YY hh:mm A")
                : showOnly
                ? moment(showOnlyData.bookedFor).format("DD MMM 'YY hh:mm A")
                : ''}
            </Text>
            <Text
              style={[
                ConfirmAppointmentStyles.text,
                {color: Colors.primary_text_color[theme]},
              ]}>
              {showOnly
                ? `Dr.${doctor.firstName} ${doctor.lastName} - ${doctor.specialty}`
                : `Dr. ${doctorData?.basic.name} - ${doctorData?.specialty}`}
            </Text>
            <Text
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.bottomText,
                {color: Colors.primary_text_color[theme]},
              ]}>
              {Local('patient.appointment_summary.consultation_fee')}- ₹
              {doctorData && doctorData?.fee
                ? doctorData?.fee
                : doctor && doctor.fee
                ? doctor.fee
                : 0}
            </Text>
          </View>
        </View>

        <View style={ConfirmAppointmentStyles.rootGroup}>
          <Text
            style={[
              ConfirmAppointmentStyles.rootHeading,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local('patient.appointment_summary.notes')}
          </Text>
          <View
            style={[
              ConfirmAppointmentStyles.inputGroup,
              {backgroundColor: Colors.secondary_background[theme]},
            ]}>
            {/* <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  ConfirmAppointmentStyles.bottomText,
                  ConfirmAppointmentStyles.upperText,
                ]}>
                Add notes for the doctor
              </Text> */}
            {!showOnly ? (
              <TextInput
                style={[
                  ConfirmAppointmentStyles.text,
                  ConfirmAppointmentStyles.bottomText,
                  ConfirmAppointmentStyles.upperText,
                  {color: Colors.primary_text_color[theme]},
                ]}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    setErrors({
                      ...error,
                      notes: false,
                    });
                  }
                  setnotes(text);
                }}
                placeholder={`${Local('patient.appointments.add_notes')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            ) : (
              <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  {color: Colors.primary_text_color[theme]},
                ]}>
                {patientInfoobj.notes}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            marginLeft: '-10%',
            marginTop: '-2%',
          }}>
          {error.notes && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Notes and Reason for visit field should not be empty'}
            />
          )}
        </View>
        {showOnly &&
          patientInfo &&
          patientInfo &&
          patientInfo?.QandA?.length &&
          patientInfo?.QandA?.length > 0 && (
            <View style={ConfirmAppointmentStyles.rootGroup}>
              <Text
                style={[
                  ConfirmAppointmentStyles.rootHeading,
                  {color: Colors.primary_text_color[theme]},
                ]}>
                {Local('patient.appointment_summary.answers')}
              </Text>
              <View
                style={[
                  ConfirmAppointmentStyles.inputGroup,
                  {backgroundColor: Colors.secondary_background[theme]},
                ]}>
                {patientInfo?.QandA.map((q, index) => (
                  <View>
                    <Text
                      style={[
                        ConfirmAppointmentStyles.text,
                        {color: Colors.primary_text_color[theme]},
                      ]}>
                      {q.question} :
                      <Text
                        style={[
                          ConfirmAppointmentStyles.text,
                          {color: Colors.primary_text_color[theme]},
                        ]}>
                        {' '}
                        {q.answer}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        {console.log(notes, reasonForVisit)}
        {!showOnly && (
          <DmzButton
            //  dispatch(profilePicUploaded())
            // isLoading={isPatientAccountReducerLoading}
            onPress={handelAppointmentSubmit}
            // disabled={notes.length == 0 || reasonForVisit.length == 0}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginVertical: 20,
                marginBottom: 60,
                elevation: 3,
              },
            }}
            text={`${Local('doctor.appointments.confirm')}`}
          />
        )}
      </ScrollView>

      {/* <ScheduleAppointment
        doctors={data.output || data.appointments}
        activeId={0}
        PopupTranslateY={PopupTranslateY}
        onPress={onPress}
        showPopup={showPopup}
        navigation={navigation}
        // obj ={ _.dropRightWhile(doctors, ['_id', __id])}
      /> */}
    </View>
  );
};

const ConfirmAppointmentStyles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingBottom: '10%',
    backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
  ScheduleAvailability: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ScheduleTiming: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
  },
  DateAndTime: {
    marginLeft: 5,
  },
  Date: {
    color: '#222',
  },
  Time: {
    fontWeight: '600',
    fontSize: 15,
  },
  Available: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvailableText: {
    color: '#22C663',
    marginLeft: 10,
  },
  InputLabel: {
    fontSize: 18,
    color: '#545454',
    marginTop: 10,
    marginLeft: 10,
  },
  ConsultFeeContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootGroup: {
    margin: 15,
    marginVertical: 20,
  },
  rootHeading: {
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    marginBottom: 10,
  },
  inputGroup: {
    borderRadius: 15,
    // padding: 10,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    // paddingVertical: 20,
  },
  upperText: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottomText: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default ConfirmAppointment;
