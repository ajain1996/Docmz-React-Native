import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  PermissionsAndroid,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  GREY_OUTLINE,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../../../utils/connection';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsOriginal from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { resetStore } from '../../../reduxV2/action/AuthAction';
import ImagePicker from 'react-native-image-picker';
import {
  UploadProfilePicPatient,
  GetPatientInfo,
  UpdateProfile,
} from '../../../reduxV2/action/PatientAction';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import { Local, setLocale } from '../../../i18n';
import { Colors } from '../../../styles/colorsV2';
// import { useIsFocused } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

const NewProfile = ({ navigation }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { patient } = useSelector((state) => state.PatientReducer);
  const [credential, setCredential] = useState({
    name: '',
    age: '',
    gender: '',
  });
  const [popupHeight, setPopupHeight] = useState(400);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const [popupVisible, setPopupVisible] = useState(false);
  const [aboutPopupHeight, setAboutPopupHeight] = useState(400);
  const animateHeightOfAboutPopup = useRef(new Animated.Value(0)).current;
  const [aboutPopupVisible, setAboutPopupVisible] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );
  const dispatch = useDispatch();

  const isDrawer = useIsDrawerOpen();

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  useEffect(() => {
    console.log('???????????????????');
    if (aboutPopupVisible) {
      onPressDetails();
    } else if (popupVisible) {
      onPressAvatar();
    }
  }, [isDrawer]);

  // useEffect(() => {
  //   const backAction = () => {

  //     navigation.goBack()

  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    setCredential({
      name: userData.firstName + ' ' + userData.lastName,
      age: userData.age,
      gender: userData.sex,
    });
    if (patient.picture) {
      setImageSource({
        uri: `${Host}${patient.picture
          .replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [patient]);

  const onLogout = () => {
    setLoggingOut(true);
    dispatch(
      resetStore(() => {
        navigation.navigate('MainController');
      }),
    );
  };

  const onPressAvatar = () => {
    animateHeightOfAboutPopup.setValue(0);
    setAboutPopupVisible(false);
    Animated.timing(animateHeightOfPopup, {
      useNativeDriver: true,
      toValue: popupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setPopupVisible(!popupVisible);
    });
  };
  const onPressDetails = () => {
    animateHeightOfPopup.setValue(0);
    setPopupVisible(false);
    Animated.timing(animateHeightOfAboutPopup, {
      useNativeDriver: true,
      toValue: aboutPopupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setAboutPopupVisible(!aboutPopupVisible);
    });
  };
  const onPopupLayoutChange = (event) => {
    setPopupHeight(event.nativeEvent.layout.height);
  };
  const onAboutPopupLayoutChange = (event) => {
    setAboutPopupHeight(event.nativeEvent.layout.height);
  };

  const onRemove = async () => {

  };
  const onChooseCamera = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCamera();
    } else {
      askPermission(PickCamera);
    }
  };
  const onChooseGallery = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGallery();
    } else {
      askPermission(PickGallery);
    }
  };
  const askPermission = async (launch) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (patient._id) {
          setProfileLoading(true);
          dispatch(
            UploadProfilePicPatient(
              patient._id,
              response,
              (res) => {
                console.log(res.data.data, "lsdfjsdlkfjdskf")
                setProfileLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(GetPatientInfo(patient._id));
              },
              () => {
                setProfileLoading(false);
              },
            ),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };
  const PickGallery = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (patient._id) {
          setProfileLoading(true);
          dispatch(
            UploadProfilePicPatient(
              patient._id,
              response,
              () => {
                setProfileLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(GetPatientInfo(patient._id));
              },
              () => {
                setProfileLoading(false);
              },
            ),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };

  const onUpdateDetails = () => {
    const Name = credential.name.split(' ');
    console.log(Name, Name[0], Name[1], '?????????????');
    setProfileLoading(true);
    const profileData = {
      firstName: Name[0],
      lastName: Name[1],
      age: credential.age,
      sex: credential.gender,
    };
    dispatch(
      UpdateProfile(profileData, patient._id, () => {
        setProfileLoading(false);
        onPressDetails();
      }),
    );
  };

  const [errorInCredential, setErrorInCredential] = useState({
    name: true,
    age: true,
    gender: true,
  });

  const onPressUpdate = () => {
    let flag = false;

    for (let e in error) {
      if (!error[`${e}`]) {
        flag = true;
        break;
      }
    }
    if (flag) {
      console.log('invalid input');
    } else {
      onUpdate(details);
    }
  };
  const onChangeCredential = (type, value) => {
    const string = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const number = /^[0-9]+$/;
    let match;
    switch (type) {
      case 'name':
        match = string.test(value);
        break;
      case 'age':
        match = number.test(value);
        break;
      case 'gender':
        match = string.test(value);
        break;
    }
    setErrorInCredential({ ...errorInCredential, [`${type}`]: match });
    setCredential({ ...credential, [`${type}`]: value.trim() });
  };

  // console.log(patient, 'LLLLLLLLLLLLLLLLLLLLLL');
  
  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.secondary_background[theme] }}>
      <TopNavBar
        headerText={`${Local('patient.my_profile.my_profile')}`}
        {...{ navigation }}
        style={{ Container: { paddingTop: 5, marginBottom: 10 } }}
      />
      {(profileLoading || loggingOut) && (
        <BlurSpinner visible={true}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 15,
            alignSelf: 'center',
            marginVertical: '4%',
          }}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Image
              source={imageSource}
              style={{ height: 120, width: 120, borderRadius: 60, margin: 15 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDetails}
            style={{ alignItems: 'center' }}>
            {patient ? (
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: Colors.primary_text_color[theme],
                  fontSize: 20,
                }}>
                {patient?.firstName?.toTitleCase() +
                  ' ' +
                  patient?.lastName?.toTitleCase()}
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                width: 170,
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {patient?.age ? (
                <View
                  style={{
                    padding: 1,
                    alignItems: 'center',
                    borderColor: patient?.sex ? NEW_PRIMARY_COLOR : "none",
                    borderRightWidth: 1.5,
                    flex: 1,
                  }}>
                  <Text
                    style={[
                      styles.smallText,
                      { color: Colors.primary_text_color[theme] },
                    ]}>
                    {patient?.age} yrs
                  </Text>
                </View>
              ) : null}

              {patient?.sex ? (
                <View
                  style={{
                    padding: 1,
                    alignItems: 'center',
                    // borderColor: NEW_PRIMARY_COLOR,
                    // borderLeftWidth: 1.5,
                    flex: 1,
                  }}>
                  <Text
                    style={[
                      styles.smallText,
                      { color: Colors.primary_text_color[theme] },
                    ]}>
                    {patient?.sex}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 30, marginVertical: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MedicalHistory', {})}>
            <View style={styles.listRow}>
              <MaterialIcon
                style={{
                  fontSize: 36,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="medical-bag"></MaterialIcon>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.medical_history')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('FamilyMember', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/family.png')}
                style={{ height: 25, width: 50, marginHorizontal: 10 }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.my_family')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyDoctors', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/healthcare.png')}
                style={{ height: 25, width: 50, marginHorizontal: 10 }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.my_healthcare_team')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Appointments', {})}>
            <View style={styles.listRow}>
              <MaterialIcon
                style={{
                  fontSize: 36,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="calendar-account"></MaterialIcon>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.my_appointments')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate('MyDoctors')}>
            <View style={styles.listRow}>
              <Ionicons
                style={{ fontSize: 36, marginHorizontal: '6%', color: NEW_PRIMARY_COLOR }}
                name="person-circle">
              </Ionicons>
              <Text style={[styles.smallText, { flex: 1 }]}>My Doctors</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <View style={styles.listRow}>
              <MaterialIcon
                style={{
                  fontSize: 36,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="bank-transfer"></MaterialIcon>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.my_transactions')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Refferal')}>
            <View style={styles.listRow}>
              <MaterialIcon
                style={{ fontSize: 32, marginHorizontal: '6%', color: NEW_PRIMARY_COLOR }}
                name="gift">
              </MaterialIcon>
              <Text style={[styles.smallText, { flex: 1, color: Colors.primary_text_color[theme] }]}>{Local("patient.my_profile.refferal")}</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.navigate('Skins')}>
            <View style={styles.listRow}>
              <MaterialIcon
                style={{
                  fontSize: 32,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="format-color-fill"></MaterialIcon>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('doctor.Settings.skin')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PatientProfile')}>
            <View style={styles.listRow}>
              <AntDesignIcons
                style={{
                  fontSize: 32,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="user"></AntDesignIcons>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('doctor.profile.profile')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PatientSettings')}>
            <View style={styles.listRow}>
              <MaterialIconsOriginal
                style={{
                  fontSize: 32,
                  marginHorizontal: '6%',
                  color: NEW_PRIMARY_COLOR,
                }}
                name="settings"></MaterialIconsOriginal>
              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.settings')}
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout}>
            <View style={styles.listRow}>
              <View
                style={{
                  height: 20,
                  width: 50,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcon name={'lock'} size={36} color={'#047b7b'} />
              </View>

              <Text
                style={[
                  styles.smallText,
                  { flex: 1, color: Colors.primary_text_color[theme] },
                ]}>
                {Local('patient.my_profile.logout')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <Text style={[styles.smallText, { marginRight: 10 }]}>Link with</Text>

          <Image
            source={require('../../../assets/icons/profile/google.png')}
            style={{ height: 25, width: 25, marginHorizontal: 10 }}
            resizeMode="contain"
          />

          <Image
            source={require('../../../assets/icons/profile/facebook.png')}
            style={{ height: 25, width: 25, marginHorizontal: 10 }}
            resizeMode="contain"
          />
        </View> */}
      </ScrollView>
      <Animated.View
        onLayout={onPopupLayoutChange}
        style={{
          width: '100%',
          height: '30%',
          backgroundColor: Colors.profile_popup_bg[theme],
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: '10%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: [
            {
              translateY: animateHeightOfPopup.interpolate({
                inputRange: [0, 1],
                outputRange: [popupHeight, 0],
              }),
            },
          ],
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: Colors.primary_text_color[theme],
          }}>
          {Local('patient.my_profile.update_profile_picture')}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              onPress={onChooseGallery}
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: '2%',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('patient.my_profile.gallery')}
            </Text>
          </View>

          <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              onPress={onChooseCamera}
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: '2%',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('patient.my_profile.camera')}
            </Text>
          </View>

          <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  UpdateProfile({ picture: "" }, patient._id, () => {
                    setProfileLoading(false);
                    onPressDetails();
                  }),
                );
              }}
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialIcon name={'delete'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: '2%',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('patient.my_profile.remove_photo')}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View
        onLayout={onAboutPopupLayoutChange}
        style={{
          width: '100%',
          height: isKeyboardVisible ? '40%' : '30%',
          backgroundColor: Colors.profile_popup_bg[theme],
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: '5%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'space-around',
          transform: [
            {
              translateY: animateHeightOfAboutPopup.interpolate({
                inputRange: [0, 1],
                outputRange: [aboutPopupHeight, 0],
              }),
            },
          ],
        }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Montserrat-SemiBold',
            color: Colors.primary_text_color[theme],
          }}>
          {Local('patient.my_profile.update_profile_details')}
        </Text>
        <View style={{ width: '75%' }}>
          <TextInput
            value={credential.name}
            onChangeText={(name) => onChangeCredential('name', name)}
            placeholder={'Name'}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={[
              {
                borderBottomWidth: 1,
                color: Colors.primary_text_color[theme],
                borderBottomColor: '#047b7b',
                paddingVertical: '2%',
                marginBottom: '2%',
              },
              !errorInCredential.name && { borderBottomColor: 'red' },
            ]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder={'Age'}
              value={credential.age}
              maxLength={2}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              onChangeText={(age) => {
                if (!Number.isNaN(Number(age)) && age != ' ') {
                  onChangeCredential('age', age);
                }
              }}
              keyboardType={'number-pad'}
              style={[
                {
                  borderBottomWidth: 1,
                  color: Colors.primary_text_color[theme],

                  borderBottomColor: '#047b7b',
                  paddingVertical: '2%',
                  paddingRight: '9%',
                },
                !errorInCredential.age && { borderBottomColor: 'red' },
              ]}
            />
            <RadioGroupV2
              horizontal
              activeKey={credential.gender}
              style={{
                justifyContent: 'space-around',
                paddingRight: '20%',
                paddingLeft: '10%',
                paddingTop: '5%',
              }}
              setActiveKey={(gender) => setCredential({ ...credential, gender })}
              Item={[
                { value: 'Male', id: 'Male' },
                { value: 'Female', id: 'Female' },
              ]}
            />
            {/* <TextInput
              placeholder={'Gender'}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              onChangeText={(gender) => onChangeCredential('gender', gender)}
              style={[
                {
                  borderBottomWidth: 1,
                  borderBottomColor: '#047b7b',
                  color: Colors.primary_text_color[theme],
                  paddingVertical: '2%',
                  paddingRight: '9%',
                },
                !errorInCredential.gender && { borderBottomColor: 'red' },
              ]}
            /> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={onUpdateDetails}
          style={{
            backgroundColor: '#047b7b',
            paddingVertical: '3%',
            paddingHorizontal: '5%',
            borderRadius: 10,
            marginTop: '5%',
          }}>
          <Text style={{ fontSize: 16, color: '#fff' }}>
            {Local('patient.my_profile.submit')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NewProfile;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  listRow: {
    flexDirection: 'row',
    // paddingVertical: 15,
    borderColor: GREY_OUTLINE,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 60,
  },
  rowRightIcon: {
    height: 15,
    width: 20,
    transform: [{ rotateZ: '180deg' }],
  },
});
