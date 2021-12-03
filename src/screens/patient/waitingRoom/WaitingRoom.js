import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  BackHandler,
  Animated,
  Easing,
  ActivityIndicator,
  Image,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {Avatar, Divider, Icon} from 'react-native-elements';

import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  GREY_OUTLINE,
  GREY_CARD,
  NEW_PRIMARY_LIGHT_BG,
} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CallModal from '../../../components/molecules/Modal/CallModal';
import {connect, useSelector, useDispatch} from 'react-redux';
import {WaitingRoomSocket} from '../../../utils/socket';
const {width} = Dimensions.get('window');
import {Colors} from '../../../styles/colorsV2';
import { Local } from '../../../i18n';
import moment from 'moment';


class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.theme = this.props.theme;
    this.WaitingRoomSocket = WaitingRoomSocket;
    this.appointment = this.props.route.params.appointment;
    this.doctor = this.appointment.doctor;

    this.state = {
      modalVisible: false,
      PatientWaiting: [],
      totalSeconds: 0,
    };
  }
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        styles: 'cancel',
      },
      {text: 'YES', onPress: () => this.navigation.goBack()},
    ]);
    return true;
  };
  componentDidMount() {
    console.log('routes');
    this.WaitingRoomSocket.emit('push_to_queue', {
      appointmentsDetails: this.appointment,
    });

    this.interval = setInterval(this.computeOngoingTime, 1000);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  computeOngoingTime = () => {
    const {bookedFor} = this.appointment;
    const now = new Date();
    const date = new Date(bookedFor);

    let totalSeconds = Math.floor((date - now) / 1000);

    // let seconds = Math.floor((_totalSecBy - minutes) * 60);
    this.setState({totalSeconds: totalSeconds});
    // setOngoingTime({type: 'seconds', seconds});
    // setOngoingTime(totalSeconds);
  };
  comparePatientsWaiting = (firstElement, secondElement) => {
    const firstBookedFor = new Date(firstElement.bookedFor).getTime();
    const secondBookedFor = new Date(secondElement.bookedFor).getTime();
    return firstBookedFor == secondBookedFor
      ? 0
      : firstBookedFor > secondBookedFor
      ? 1
      : -1;
  };
  onFetchedWaitingPatients = ({PatientsWaiting}) => {
    console.log('patients waiting occured');
    const modifiedPatientWaiting = PatientsWaiting.sort(
      this.comparePatientsWaiting,
    );
    console.log(modifiedPatientWaiting);
    this.setState({PatientWaiting: modifiedPatientWaiting});
  };
  onNewPatientEnqueued = ({patientDetails}) => {
    console.log('new patient enqueued');
    const patientsWaiting = [...this.state.PatientWaiting, patientDetails];
    const modifiedPatientWaiting = patientsWaiting.sort(
      this.comparePatientsWaiting,
    );
    console.log(modifiedPatientWaiting);

    this.setState({PatientWaiting: modifiedPatientWaiting});
  };
  setPatientStatus = (data, status) => {
    console.log(`${data.patientId} came ${status ? 'online' : 'offline'}`);
    // console.log(this.props.theme)

    const {patientId} = data;
    const modified = this.state.PatientWaiting.map((item) => {
      const {Patient} = item;
      const {_id} = Patient;
      if (patientId == _id) {
        return {
          _id: item._id,
          bookedFor: item.bookedFor,
          Patient: {
            ...item.Patient,
            online: status,
          },
        };
      } else {
        return item;
      }
    });
    this.setState({PatientWaiting: modified});
  };
  onPatientOnline = (data) => {
    this.setPatientStatus(data, true);
  };
  onPatientOffline = (data) => {
    this.setPatientStatus(data, false);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.backHandler.remove();
  }
  render() {
    const {totalSeconds} = this.state;
    let hours = Math.floor(totalSeconds / 3600);
    let _totalSecBy = (totalSeconds / 3600 - hours) * 60;
    let minutes = Math.floor(_totalSecBy);
    return (
      <View
        style={[
          styles.mianContainer,
          {backgroundColor: Colors.primary_background[this.theme]},
        ]}>
        <CallModal
          visible={this.state.modalVisible}
          onCancel={() => this.setState({modalVisible: false})}
          onVoiceCall={() => {
            // navigation.navigate('videoCall', {});
          }}
          onVideoCall={() => {
            // navigation.navigate();
          }}
        />
        <TopNavBar
          headerText="WaitingRoom"
          style={{Container: {marginTop: 5, marginBottom: 10}}}
          navigation={this.navigation}
        />
        <Image
          source={require('../../../assets/images/waitingRoomBanner.png')}
          style={{
            width: '100%',
            height: 130,
            resizeMode: 'contain',
          }}
        />
        

<AppointmentBanner
  doctor= {this.doctor}
  hours={hours}
  minutes={minutes}
  appointment={this.appointment}
          // navigation={this.navigation}
          // selectedAppointment={this.state.selectedAppointment}
          // totalWaitingPatient={this.state.PatientWaiting.length}
          // nextInLine={
          //   this.state.PatientWaiting.length > 1
          //     ? `${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.firstName} ${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.lastName}`
          //     : '---'
          // }
        />

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={[
              styles.tabContainer,
              {
                borderRightWidth: 1,
                backgroundColor: Colors.primary_background[this.theme],
              },
            ]}>
            <Text
              style={[
                styles.activeTabText,
                {color: Colors.primary_text_color[this.theme]},
              ]}>
              Queue
            </Text>
          </View>
          
        </View> */}

        {/* <View style={{flex: 1}}>
          <View
            style={{
              // height: 250,
              width: '100%',
              backgroundColor: Colors.primary_light_bg[this.theme],
              alignItems: 'center',
              padding: 30,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                color: Colors.primary_text_color[this.theme],
              }}>
              {`Dr. ${this.doctor.firstName} ${this.doctor.lastName}`}
            </Text>
            <View
              style={{
                height: 4,
                width: 70,
                backgroundColor: Colors.primary_color[this.theme],
                margin: 30,
              }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                color: Colors.primary_text_color[this.theme],
                textAlign: 'center',
              }}>
              {''}
            </Text>
          </View>

          <View
            style={{
              borderColor: GREY_OUTLINE,
              borderBottomWidth: 1,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 24,
                alignSelf: 'center',
              }}>{`Time remaining ${hours}:${minutes}`}</Text>
            
          </View>
          
        </View> */}
        
      </View>
    );
  }
}


function AppointmentBanner({
  doctor,
  hours,
  minutes,
  appointment,
  selectedAppointment,
  totalWaitingPatient,
  nextInLine,
  navigation
}) {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const {patient} = useSelector((state) => state.PatientReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   GetPatientInfo(selectedAppointment?._id, true, () =>
    //     console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
    //   ),
    // );
  }, []);
  // console.log(patient, "LLLLLLLLLLLLLLLLLLLLLLLLL")
  /**
   * ========= Animation control =============
   */
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(anim1, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim3, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value_ = {
    inputRange: [0, 1],
    outputRange: [50, 0],
  };
  const value = {
    inputRange: [0, 0.2],
    outputRange: [0, 1],
  };
  const translateY1 = anim1.interpolate(value_);
  const translateX2 = anim1.interpolate(value_);
  const translateY2 = anim1.interpolate(value_);
  const translateX3 = anim1.interpolate(value_);
  const translateY3 = anim1.interpolate(value_);
  /**
   * ========= Animation control END =============
   */
  return (
    <View
      style={[
        styles.container,
        // {backgroundColor: "#000"},
        {backgroundColor: Colors.secondary_background[theme]},
      ]}>
      <Text
        style={[
          styles.bannerHeading,
          {color: Colors.primary_text_color[theme]},
        ]}>
        {Local("doctor.waiting.appointment_with")}:
      </Text>
      <Animated.View
        style={[
          styles.patientDetails,
          {
            opacity: anim1.interpolate(value),
            transform: [
              {
                translateY: translateY1,
              },
            ],
          },
        ]}>
        <Text style={[styles.name, {color: Colors.primary_text_color[theme]}]}>
          {/* {selectedAppointment
            ? `${selectedAppointment?.appointmentsDetails?.patient?.firstName} ${selectedAppointment?.appointmentsDetails?.patient?.lastName}`
            : '---'} */}
            {`Dr. ${doctor.firstName} ${doctor.lastName}`}
        </Text>
        <View style={styles.patientSubDetails}>
          <Text
            style={[
              styles.ffMedium,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {patient?.age ? patient?.age : '-- '} yrs
            {/* 28 yrs */}
          </Text>
          <View
            style={[styles.dot, {color: Colors.primary_text_color[theme]}]}
          />
          <Text
            style={[
              styles.ffMedium,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {patient?.gender
              ? patient?.gender?.substring(0, 1).toUpperCase()
              : '--'}
              {/* Male */}
          </Text>
          <View
            style={[styles.dot, {color: Colors.primary_text_color[theme]}]}
          />
          <Text
            style={[
              styles.ffMedium,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {patient?.weight?.value ? patient?.weight.value : '--'} Kg
            {/* 28Kg */}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.appointmentDetails,
          {
            opacity: anim2.interpolate(value),
            transform: [
              {
                translateX: translateX2,
              },
              {
                translateY: translateY2,
              },
            ],
          },
        ]}>
        <View style={styles.appointmentLeftSection}>
          <Text
            style={[
              styles.textLabel,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local("doctor.waiting.reason_visit")} :{' '}
            <Text style={styles.textHighlightValue}>
              {appointment
                ? appointment?.reasonForVisit
                : '---'}
                
            </Text>
          </Text>
          <Text
            style={[
              styles.textLabel,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {Local("doctor.waiting.last_visit")} :
            <Text
              style={[
                styles.textNormalValue,
                {color: Colors.primary_text_color[theme]},
              ]}>
              {moment(new Date()).format("DD MMM YYYY")}
            </Text>
          </Text>
        </View>
        <View style={styles.appointmentRightSection}>
          <Text
            style={[
              styles.textLabel,
              styles.darkGrey,
              {color: Colors.color_dark_grey[theme]},
            ]}>
            {Local("doctor.waiting.to_pay")}:{' '}
            <Text style={styles.textNormalValue}>
              ${appointment?.amount}
              {/* $ 200 */}
            </Text>
          </Text>
          {/* <TouchableOpacity onPress={() => {
            navigation.navigate('PatientDetails', {
              selectedAppointment,
              appointment : {},
            });
          }}>
          <Text
            style={[
              styles.textLabel,
              styles.textUnderline,
              {color: Colors.primary_text_color[theme]},
            ]}>
            View Profile
          </Text>
          </TouchableOpacity> */}
        </View>
      </Animated.View>
      <Divider style={styles.divider} />
      <Animated.View
        style={[
          styles.appointmentsDetails,
          {
            opacity: anim3.interpolate(value),
            transform: [
              {
                translateX: translateX3,
              },
              {
                translateY: translateY3,
              },
            ],
          },
        ]}>
        <Text
          style={[
            styles.textLabel,
            styles.fontMedium,
            styles.darkGrey,
            {color: Colors.color_dark_grey[theme]},
          ]}>
            {Local("doctor.waiting.Time remaining")}
           :{' '}
          <Text
            style={[
              styles.textNormalValue,
              {color: Colors.primary_text_color[theme]},
            ]}>
            {`${hours} hours and ${minutes} minutes`}
          </Text>
        </Text>
        {/* <Text
          style={[
            styles.textLabel,
            styles.fontMedium,
            styles.darkGrey,
            {color: Colors.color_dark_grey[theme]},
          ]}>
          {Local("doctor.waiting.next_in_line")} :{' '}
          <Text
            style={[
              styles.textNormalValue,
              {color: Colors.primary_text_color[theme]},
            ]}>
            Radha Vyas
          </Text>
        </Text> */}
      </Animated.View>
    </View>
  );
}

const mapProps = (state) => {
  // console.log(this.props.theme)
  return {
    theme: state.AuthReducer.theme,
  };
};

export default connect(mapProps)(WaitingRoom);

const styles = StyleSheet.create({
  // mianContainer: {
  //   flex: 1,
  //   // backgroundColor: 'white',
  //   justifyContent: 'flex-start',
  // },
  // tabContainer: {
  //   flex: 1,
  //   marginVertical: 15,
  //   alignItems: 'center',
  //   borderColor: NEW_PRIMARY_COLOR,
  //   paddingVertical: 3,
  // },
  // inactiveTabText: {
  //   fontFamily: 'Montserrat-Regular',
  //   color: INPUT_PLACEHOLDER,
  //   fontSize: 18,
  // },
  // activeTabText: {
  //   fontFamily: 'Montserrat-Bold',
  //   fontSize: 18,
  //   // color: NEW_HEADER_TEXT,
  // },
  container: {
    padding: '4%',
    backgroundColor: '#FFF',
    elevation: 5,
  },
  bannerHeading: {
    color: '#a09e9e',
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 4,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },
  patientSubDetails: {
    flex: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 50,
    backgroundColor: '#efa860',
  },
  appointmentDetails: {
    paddingTop: '3%',
    paddingBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  appointmentLeftSection: {
    flex: 5,
  },
  textLabel: {
    fontSize: 12,
    color: '#a09e9e',
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
  },
  small: {
    fontSize: 13,
    lineHeight: 16,
  },
  ffRegular: {
    fontFamily: 'Montserrat-Regular',
  },
  ffSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  textHighlightValue: {
    color: '#ef786e',
    fontFamily: 'Montserrat-Medium',
  },
  textNormalValue: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  appointmentRightSection: {
    flex: 1.8,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#eaeaea',
  },
  appointmentsDetails: {
    paddingTop: '2%',
  },
  ffMedium: {
    fontFamily: 'Montserrat-Medium',
  },
  fontLarge: {
    fontSize: 17,
  },
  fontMedium: {
    fontSize: 14,
    lineHeight: 30,
  },
  darkGrey: {
    color: '#7c7c7c',
  },
});
