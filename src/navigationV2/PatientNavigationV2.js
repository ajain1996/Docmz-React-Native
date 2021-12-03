/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import MyDoctors from '../screens/patient/mydoctors/MyDoctors';
import FamilyMember from '../screens/patient/familyMember/Newfamily';
import ProfileScreen from '../screens/examples/Profile/NewProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MedicalHistory from '../screens/examples/MedicalHistory/MedicalHistory';
import HealthCare from '../screens/patient/HealthCare/HealthCare';
import LandingPage from '../screens/common/LandingPage/LandingPage';
import DoctorProfile from '../screens/doctor/DoctorProfile/DoctorProfile';
import TimeSlotScreen from '../screens/examples/TimeSlotScreen/TimeSlotScreen';
import PaymentsV2 from '../screens/examples/payments/PaymentsV2';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import Refferal from '../screens/common/Refferal/refferal';
import AuthNavigationV2 from '../navigationV2/AuthNavigationV2';
import Appointments from '../screens/patient/appointments/Appointments';
import PatientDashboard from '../screens/patient/PatientDashboard/PatientDashboard';
import WaitingRoom from '../screens/patient/waitingRoom/WaitingRoom';
import Chatting from './ChatNavigation';
// import {func} from 'prop-types';
import Transactions from '../screens/patient/transactions/transactions';
import MedicalLogs from '../screens/examples/MedicalHistory/Logs';
import { socket } from '../utils/socket';
import VideoCallScreen from '../screens/common/Chats/VideoCallScreen';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import ContinueAs from '../screens/patient/ContinueAs/ContinueAs';
import Invoice from '../screens/common/Invoice/index';
import { Host } from '../utils/connection';
import Skins from '../screens/doctor/Skins/Skins';
// import Languages from '../screens/doctor/Languages/Languages';
import { Colors } from '../styles/colorsV2';
import { Local, setLocale } from '../i18n';
import PatientProfile from '../screens/patient/Profile/profile';
import PatientSettings from '../screens/patient/settings/settings';
import HomeScreen from '../screens/doctor/home/HomeScreen';

// import {Local, setLocale} from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import DoctorHome from '../screens/doctor-home/DoctorHome';
import DoctorProfileScreen from '../screens/doctor-home/DoctorProfileScreen';
import DoctorSearchScreen from '../screens/doctor-home/DoctorSearchScreen'
import DoctorSearchScreen2 from '../screens/doctor-home/DoctorSearchScreen2';
import SelectScheduleCalendar from '../screens/schedule/SelectScheduleCalendar';
import ScheduleHomeScreen from '../screens/schedule/ScheduleHomeScreen';
import SelectScheduleScreen from '../screens/schedule/SelectScheduleScreen';

const screenWidth = Dimensions.get('screen').width;
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function PatientLanding() {
  // const {theme} = useSelector((state) => state.AuthReducer);
  return (
    <Stack.Navigator
      initialRouteName={'PatientLandingScreen'}
      headerMode={'none'}>
      {/* <Stack.Screen name={'PatientLandingScreen'} component={LandingPage} /> */}
      <Stack.Screen name={'PatientLandingScreen'} component={DoctorHome} />
      <Stack.Screen name={'DoctorProfileScreen'} component={DoctorProfileScreen} />
      <Stack.Screen name={'DoctorSearchScreen'} component={DoctorSearchScreen} />
      <Stack.Screen name={'DoctorSearchScreen2'} component={DoctorSearchScreen2} />
      <Stack.Screen name={'SelectScheduleCalendar'} component={SelectScheduleCalendar} />
      <Stack.Screen name={'ScheduleHomeScreen'} component={ScheduleHomeScreen} />
      <Stack.Screen name={'SelectScheduleScreen'} component={SelectScheduleScreen} />

      {/* <Stack.Screen name={'DoctorProfile'} component={DoctorProfile} />
      <Stack.Screen name={'TimeSlotScreen'} component={TimeSlotScreen} /> */}
      {/* <Stack.Screen
        name={'ConfirmAppointment'}
        component={ConfirmAppointment}
      />
      <Stack.Screen name={'Questionnaire'} component={QuestionnairePP} />
      <Stack.Screen name={'AppointmentsHome'} component={Appointments} />
      <Stack.Screen name={'Payments'} component={PaymentsV2} />
      <Stack.Screen name={'Auth'} component={AuthNavigationV2} /> */}
    </Stack.Navigator>
  );
}

function AppointmentStack() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'AppointmentsHome'}>
      <Stack.Screen name={'AppointmentsHome'} component={Appointments} />
      <Stack.Screen name={'WaitingRoom'} component={WaitingRoom} />
    </Stack.Navigator>
  );
}

function PatientNavigationHome() {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <BottomTabs.Navigator
      initialRouteName={'PatientLanding'}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: Colors.bottom_bg[theme],
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: 'absolute',
        },
      }}>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <Icon
                name="home"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
        }}
        name={'PatientLanding'}
        component={PatientLanding}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <Icon
                name="medical-bag"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
        }}
        name={'MedicalHistory'}
        component={MedicalHistory}
      />
      {/* <BottomTabs.Screen name={'Chat'} component={} /> */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <Icon
                name="calendar-account"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
          unmountOnBlur: true,
        }}
        name={'Appointments'}
        component={AppointmentStack}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="chat"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                size={24}
              />
            );
          },
          // tabBarVisible: false,
          unmountOnBlur: true,
        }}
        name={'Chats'}
        component={Chatting}
      />
    </BottomTabs.Navigator>
  );
}

function PatientDrawerWrapper() {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerPosition={'right'}
      drawerType={'slide'}
      backBehavior={'history'}
      drawerContent={(props) => <ProfileScreen {...props} />}
      drawerStyle={{
        width: screenWidth,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}>
      <Drawer.Screen name={'Home'} component={PatientNavigationHome} />
      <Drawer.Screen name={'MedicalHistory'} component={MedicalHistory} />
      <Drawer.Screen name={'FamilyMember'} component={FamilyMember} />
      <Drawer.Screen name={'Refferal'} component={Refferal} />
      <Drawer.Screen name={'Skins'} component={Skins} />
      <Drawer.Screen name={'HealthCare'} component={HealthCare} />
      <Drawer.Screen name={'Transactions'} component={Transactions} />
      <Drawer.Screen name={'MedicalLogs'} component={MedicalLogs} />
      <Drawer.Screen name={'Appointments'} component={AppointmentStack} />
      <Drawer.Screen name={'MyDoctors'} component={MyDoctors} />
      <Drawer.Screen name={'Dashboard'} component={PatientDashboard} />
      {/* <Drawer.Screen name={'ContinueAs'} component={ContinueAs} /> */}
      <Drawer.Screen name={'PatientProfile'} component={PatientProfile} />
      <Drawer.Screen name={'PatientSettings'} component={PatientSettings} />
      <Drawer.Screen name={'invoice'} component={Invoice} />
      <Stack.Screen name={'DoctorProfile'} component={DoctorProfile} />
      <Stack.Screen name={'TimeSlotScreen'} component={TimeSlotScreen} />
      <Stack.Screen
        name={'ConfirmAppointment'}
        component={ConfirmAppointment}
      />
      <Stack.Screen name={'Questionnaire'} component={QuestionnairePP} />
      <Stack.Screen name={'AppointmentsHome'} component={Appointments} />
      <Stack.Screen name={'Payments'} component={PaymentsV2} />
      <Stack.Screen name={'Auth'} component={AuthNavigationV2} />
      {/* // Setting,
    // Wishlist,
    // Orders,
    // Consultations,
    // Help,
    // AppSettings,
    // NotFound,
    // PatientSubscription,
    // RedeemVoucher,
    // Questionnaire: QuestionnairePP,
    // Profile: {screen: ProfileStack},
    // Address: {screen: AddressStack},
    // VoiceCall: {screen: VoiceCall}, */}
    </Drawer.Navigator>
  );
}

function PatientNavigationV2({ navigation }) {
  const Socket = useRef(socket).current;
  const { userData, isDoctor } = useSelector((state) => state.AuthReducer);

  // push notifications
  useEffect(function firebaseMessageHandling() {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log({ remoteMessage });

      PushNotification.localNotification({
        channelId: '123456789',
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.description,
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('useeffect for socket ', Socket.connected);
    if (Socket.connected) {
      Socket.emit('set_online', {
        id: userData._id,
        type: isDoctor ? 'doctor' : 'patient',
      });
    }
    Socket.on('connect', async function (prop) {
      // console.log('connected with ', prop);
      console.log('socket it on connected ', Socket.id);

      Socket.emit('set_online', {
        id: userData._id,
        type: isDoctor ? 'doctor' : 'patient',
      });
      try {
        const value = await AsyncStorage.getItem('@sockets');
        // console.log('async storage value ', value);

        // if (value !== null) {
        //   await AsyncStorage.removeItem('@sockets');
        // }
        if (value !== null) {
          const newValue = [Socket.id].concat(JSON.parse(value));
          await AsyncStorage.setItem('@sockets', JSON.stringify(newValue));
        } else {
          const newValue = [Socket.id];
          await AsyncStorage.setItem('@sockets', JSON.stringify(newValue));
        }
      } catch (e) {
        // error reading value
        console.log('error reading value');
      }
    });
    Socket.on('reconnect', async function (number) {
      console.log('reconnected ', number, ' th time');
      console.log('socket id ,', Socket.id);
      try {
        const value = await AsyncStorage.getItem('@sockets');
        // console.log('async storage value ', value);
        if (value !== null) {
          const val = JSON.parse(value);
          const newValue = val.filter((soc) => soc != Socket.id);
          // console.log('async storage new value ', newValue);
          if (newValue.length > 0) {
            Socket.emit('remove_these_sockets', {
              socs: newValue,
              id: userData._id,
              type: isDoctor ? 'doctor' : 'patient',
            });
          }
        }
      } catch (e) {
        // error reading value
        console.log('error reading value');
      }
    });
    Socket.on('disconnect', function (reason) {
      try {
        // console.log('disconnected ', reason);
      } catch (e) {
        console.log('error ', e);
      }
    });
    Socket.on('delete_those_local_sockets', async function () {
      try {
        console.log('delete_those_local_sockets occured');
        const value = await AsyncStorage.getItem('@sockets');
        // console.log('async storage value ', value);
        if (value !== null) {
          await AsyncStorage.removeItem('@sockets');
        }
        const newV = await AsyncStorage.getItem('@sockets');
        console.log('after deletion ', newV);
      } catch (e) {
        console.log('error deleting ', e);
      }
    });
    return () => {
      Socket.off('connect');
      Socket.off('reconnect');
      Socket.off('disconnect');
      Socket.off('delete_those_local_sockets');
    };
  }, [Socket, isDoctor, userData._id]);
  useEffect(() => {
    function onCallMade({ User, type, room, callType }) {
      console.log('call-made in socket');
      navigation.navigate('videoCall', {
        room,
        mode: 'thatSide',
        User,
        type,
        callType,
      });
    }
    Socket.on('call-made', onCallMade);
    return () => {
      Socket.off('call-made', onCallMade);
    };
  }, [Socket, isDoctor, navigation, userData._id]);

  useEffect(() => {
    const saveTokenToDatabase = async (token) => {
      fetch(`${Host}/patient/setDeviceToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          id: userData.id,
        }),
      })
        .then((res) => {
          // console.log('res', res);
        })
        .catch((e) => {
          console.log('errpr', e);
        });
    };
    try {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token, '$$$$$$$$$$$$$$$$$$$');
          return saveTokenToDatabase(token);
        })
        .catch((e) => {
          console.log(e);
          // console.error(e);
        });
    } catch (E) {
      console.log(E);
      // console.error(E);
    }

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, [userData.id]);
  return (
    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={
        userData.isFamilyMember ? 'ContinueAs' : 'PatientDrawerWrapper'
      }>
      {/* <Stack.Screen name={'ContinueAs'} component={ContinueAs} /> */}
      <Stack.Screen
        name={'PatientDrawerWrapper'}
        component={PatientDrawerWrapper}
      />
      <Stack.Screen name={'videoCall'} component={VideoCallScreen} />
    </Stack.Navigator>
  );
}
export default PatientNavigationV2;
