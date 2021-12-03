import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import LandingPage from '../screens/common/LandingPage/LandingPage';
import DoctorProfile from '../screens/doctor/DoctorProfile/DoctorProfile';
// import GetStarted from '../screens/common/GetStarted/GetStarted';
import Splash from '../screens/common/Splash/Splash';
import {Dimensions} from 'react-native';
import CustomNoAuthDrawer from '../components/organisms/drawer/custom/CustomNoAuthDrawer';
import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
  GetAllDoctors,
} from '../reduxV2/action/DoctorToPatientAction';
//import { useDispatch } from 'react-redux';
import AuthNavigationV2 from './AuthNavigationV2';
import VideoCallScreen from '../screens/common/Chats/VideoCallScreen';
let PatientNavigationV2 = null;
//  './PatientNavigationV2';
let DoctorNavigationV2 = null;
import SplashScreen from 'react-native-splash-screen';
//  './DoctorNavigationV2';
//TODO set event listener for call notification in this app component
const screenWidth = Dimensions.get('screen').width;
const NoAuthDrawerNavigator = createDrawerNavigator();
import {eventEmitter} from '../NativeModules';
import LoginV2 from '../screens/authentication/LoginV2/LoginV2';
import forgotPassword from '../screens/authentication/LoginV2/forgotPassword';
import LoginOtp from '../screens/authentication/LoginV2/LoginOtp';
import SignupV2 from '../screens/authentication/SignupV2/SignupV2';
import StaffRegister from '../screens/authentication/SignupV2/StaffRegister';

// import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

// setJSExceptionHandler((error, isFatal) => {
//   console.log(error, isFatal, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
// }, true)

// setNativeExceptionHandler((error) => {
//   console.log(error, "$$$$$$$$$$$$$$$$$$$$$$$$$")
// })

function NoAuthNavigation() {
  return (
    <NoAuthDrawerNavigator.Navigator
      drawerPosition={'right'}
      initialRouteName={'LandingPage'}
      drawerType={'slide'}
      statusBarAnimation
      minSwipeDistance={20}
      backBehavior="history"
      drawerContent={(props) => <CustomNoAuthDrawer {...props} />}
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{
        width: screenWidth * 0.75,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}>
      <NoAuthDrawerNavigator.Screen
        name={'LandingPage'}
        component={LandingPage}
      />
      <NoAuthDrawerNavigator.Screen
        name={'DoctorProfile'}
        options={{
          unmountOnBlur: true,
        }}
        component={DoctorProfile}
      />
      <NoAuthDrawerNavigator.Screen
        name={'Auth'}
        component={AuthNavigationV2}
      />
      {/* <NoAuthDrawerNavigator.Screen name={'loginScreen'} component={LoginV2} />
      <NoAuthDrawerNavigator.Screen name={'forgotPassword'} component={forgotPassword} />
      <NoAuthDrawerNavigator.Screen name={'LoginOtp'} component={LoginOtp} />
      <NoAuthDrawerNavigator.Screen name={'staffScreen'} component={StaffRegister} />
      <NoAuthDrawerNavigator.Screen name={'signupScreen'} component={SignupV2} /> */}
    </NoAuthDrawerNavigator.Navigator>
  );
}

const MainController = ({navigation, route}) => {
  const {isLoggedin, isDoctor} = useSelector((state) => state.AuthReducer);
  if (isLoggedin) {
    if (isDoctor) {
      if (DoctorNavigationV2 === null) {
        DoctorNavigationV2 = require('./DoctorNavigationV2').default;
      }
      return <DoctorNavigationV2 navigation={navigation} />;
    } else {
      if (PatientNavigationV2 === null) {
        PatientNavigationV2 = require('./PatientNavigationV2').default;
      }
      return <PatientNavigationV2 navigation={navigation} />;
    }
  } else {
    return <NoAuthNavigation />;
  }
};

const MainStack = createStackNavigator();

function MainNavigation() {
  // const [splash, setSplash] = useState(true);
  const navigationRef = useRef();
  // //const dispatch = useDispatch()
  // useEffect(() => {
  //   //dispatch(fetchDoctorLite('', 0, false));
  //   const timer = setTimeout(() => {
  //     setSplash(false);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   //SplashScreen.hide();
  // }, []);
  useEffect(() => {
    const listener = eventEmitter.addListener('onAnswer', function (args) {
      console.log('onAnswer occured ', args);
      navigationRef.current.navigate('videoCall', {
        User: {
          firstName: args.firstName,
          lastName: args.lastName,
          _id: args._id,
        },
        mode: 'thatSide',
        room: args.room,
        type: args.type,
        autoAnswer: true,
        callType: args.callType,
      });
    });
    const rejectListener = eventEmitter.addListener('onReject', function (
      args,
    ) {
      console.log('onReject occurred ', args);
    });

    return () => {
      listener.remove();
      rejectListener.remove();
    };
  }, []);
  //console.log({ splash })
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator headerMode={'none'}>
        {/* {splash ? (
          <MainStack.Screen name={'Splash'} component={Splash} />
        ) : ( */}
        <MainStack.Screen name={'MainController'} component={MainController} />
        {/* )} */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
